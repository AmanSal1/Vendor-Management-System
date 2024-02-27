from django.db import models


class Vendor(models.Model):
        name = models.CharField(max_length=100, null=False)
        contact = models.IntegerField(null=False)
        address = models.CharField(max_length=100, null=False)
        vendor_code = models.IntegerField(unique=True)
        on_time_delivery_rate = models.FloatField(null=True)
        quality_rating_avg = models.FloatField(null=True)
        average_response_time = models.FloatField(null=True)
        fulfillment_rate = models.FloatField(null=True)


class Purchase(models.Model):
    po_number = models.IntegerField(unique=True)
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE)
    order_date = models.DateTimeField(null=True)
    expected_delivery_date = models.DateTimeField(null=True)
    delivered_date = models.DateTimeField(null=True)
    items = models.JSONField(null=True)
    quantity = models.IntegerField(null=True)
    status = models.CharField(max_length=15,null=True)
    quality_rating = models.FloatField(null=True)
    issue_date = models.DateTimeField(null =True)
    acknowledgment_date = models.DateTimeField(null=True)

class Performance(models.Model):
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE)
    pdate = models.DateTimeField()
    on_time_delivery_rate = models.FloatField()
    quality_rating_avg = models.FloatField()
    average_response_time = models.FloatField()
    fulfillment_rate = models.FloatField()



