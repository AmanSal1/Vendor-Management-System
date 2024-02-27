from django.contrib import admin
from .models import Vendor,Purchase,Performance


admin.site.register(Purchase)
admin.site.register(Performance)

@admin.register(Vendor)
class Vendoradmin(admin.ModelAdmin):
    list_display =  ['id','name', 'contact', 'address', 'vendor_code', 'on_time_delivery_rate', 'quality_rating_avg',
                  'average_response_time', 'fulfillment_rate']

