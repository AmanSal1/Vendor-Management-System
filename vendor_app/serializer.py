from rest_framework import serializers
from .models import Vendor,Purchase,Performance


class Vendorserializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = ['id', 'name', 'contact', 'address', 'vendor_code', 'on_time_delivery_rate', 'quality_rating_avg',
                  'average_response_time', 'fulfillment_rate']


class Purchasserializer(serializers.ModelSerializer):
    class Meta:
        model = Purchase
        fields = '__all__'


class Performanceserializer(serializers.ModelSerializer):
    class Meta:
        model = Performance
        fields = '__all__'






