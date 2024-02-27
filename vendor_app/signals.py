import logging

from django.db.models import F, Q, Avg
from django.db.models.signals import post_save
from django.dispatch import receiver

from vendor_app.models import Purchase, Vendor
from vendor_app.serializer import Purchasserializer
logger = logging.getLogger(__name__)



@receiver(post_save, sender=Purchase)
def calculate_and_save_metrics(sender, instance, created, **kwargs):
    if created:
        vendor_id = instance.vendor.vendor_code
        logger.info(f"Signal sent: New purchase order created with vendor ID {vendor_id}")


        # Calculate and save metrics
        calculate_and_save_vendor_metrics(vendor_id)


def calculate_and_save_vendor_metrics(vendor_id):
    data = Purchase.objects.filter(Q(vendor__vendor_code=vendor_id, status='complete') &
                                   (Q(expected_delivery_date=F('delivered_date')) | Q(
                                       delivered_date__lt=F('expected_delivery_date'))))
    vendor_completed_data = Purchase.objects.filter(vendor__vendor_code=vendor_id, status='complete')
    serializer = Purchasserializer(data, many=True)
    vendor_completed_serializer = Purchasserializer(vendor_completed_data, many=True)
    data_count = data.count()
    vendor_completed_data_count = vendor_completed_data.count()
    on_time_delivery_ratio = (vendor_completed_data_count / data_count if data_count != 0 else 0)

    # Quality Rating Average

    vendor_completed_data1 = Purchase.objects.filter(vendor__vendor_code=vendor_id)
    average_quality_rating = vendor_completed_data.aggregate(avg_quality_rating=Avg('quality_rating'))[
        'avg_quality_rating']

    # Average response time

    vendor_orders = Purchase.objects.filter(vendor__vendor_code=vendor_id)

    # Step 2: Calculate the time difference between issue_date and acknowledgment_date for each PO
    vendor_orders_with_time_diff = vendor_orders.annotate(
        time_diff=F('acknowledgment_date') - F('issue_date')
    )

    # Step 3: Calculate the average of these times for all POs of the vendor
    average_time_difference = vendor_orders_with_time_diff.aggregate(avg_time_difference=Avg('time_diff'))[
        'avg_time_difference']

    # Step 4: Convert average time difference to seconds (optional)
    average_time_difference = average_time_difference.total_seconds() if average_time_difference else None

    # Fullfilemnt rate

    completed_orders_count = vendor_completed_data.filter(status='completed', quality_rating__isnull=True).count()
    total_orders_count = vendor_completed_data.count()
    fulfillment_ratio = completed_orders_count / total_orders_count if total_orders_count != 0 else 0

    # save with the details

    vendor = Vendor.objects.get(vendor_code=vendor_id)
    vendor.on_time_delivery_rate = on_time_delivery_ratio
    vendor.quality_rating_avg = average_quality_rating
    vendor.average_response_time = average_time_difference
    vendor.fulfillment_rate = fulfillment_ratio

    vendor.save()

