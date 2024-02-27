from django.urls import path
from .views import VendorList, PurchaseDetails,CustomTokenObtainPairView



urlpatterns = [

    path('vendorapi/', VendorList.as_view(), name='VendorApi'),
    path('vendorapi/<int:id>', VendorList.as_view(), name='Vendor'),
    path('purchaseorder/', PurchaseDetails.as_view()),
    path('purchaseorder/<int:id>', PurchaseDetails.as_view()),
    path('login/',CustomTokenObtainPairView.as_view(),name='token_obtain_pair'),


]
