from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework.views import APIView
from .models import Vendor, Purchase
from rest_framework.response import Response
from rest_framework import  status
from .serializer import Vendorserializer, Purchasserializer


class VendorList(APIView):
    def get(self, request, format=None, id=None):
        if id is not None:
            print(id)
            data = Vendor.objects.filter(vendor_code=id).first()
            print(data)
            serializer = Vendorserializer(data)
            return Response(serializer.data)
        vendor = Vendor.objects.all()
        serializer = Vendorserializer(vendor, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwags):
        print(request.data)
        serializer = Vendorserializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            print("error here")
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id=None):
        if id is not None:
            data = Vendor.objects.get(vendor_code=id)
            seralizer = Vendorserializer(data, data=request.data)
            print(request.data)
            if seralizer.is_valid():
                seralizer.save()
                return Response(seralizer.data)
            return Response(seralizer.data)

    def delete(self, request, id=None):
        if id is not None:
            try:
                vendor = Vendor.objects.get(vendor_code=id)
            except Vendor.DoesNotExist:
                return Response({"error": "Vendor not found"}, status=status.HTTP_404_NOT_FOUND)
        vendor.delete()
        return Response({"message": f"Vendor with code {id} deleted successfully"})
        return Response({"error": "Vendor code parameter is required for deletion"}, status=status.HTTP_400_BAD_REQUEST)


class PurchaseDetails(APIView):
    def get(self, request, id=None):
        if id is not None:
            print(id)
            data = Purchase.objects.filter(vendor__vendor_code=id).first()
            print(data)
            serializer = Purchasserializer(data)
            return Response(serializer.data)
        purchase = Purchase.objects.all()
        serializer = Purchasserializer(purchase, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwags):

        vendor_code_from_request = request.data.get('vendor')
        vendor = Vendor.objects.get(vendor_code=vendor_code_from_request)

        request.data['vendor'] = vendor.id

        serializer = Purchasserializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            print("error here")
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id=None):
        if id is not None:
            data = Purchase.objects.get(po_number=id)
            seralizer = Purchasserializer(data, data=request.data)
            print(request.data)
            if seralizer.is_valid():
                seralizer.save()
                return Response(seralizer.data)
            return Response(seralizer.data)

    def delete(self, request, id=None):
        if id is not None:
            try:
                purchase = Purchase.objects.get(po_number=id)
            except Purchase.DoesNotExist:
                return Response({"error": f"Purchase with po_number {id} not found"}, status=status.HTTP_404_NOT_FOUND)

            purchase.delete()
            return Response({"message": f"Purchase with po_number {id} deleted successfully"})

        return Response({"error": "Purchase po_number parameter is required for deletion"},
                        status=status.HTTP_400_BAD_REQUEST)



class CustomTokenObtainPairView(APIView):
    def post(self, request):
        vendor_code = request.data.get('vendor_code')

        try:
            vendor = Vendor.objects.get(vendor_code=vendor_code)
        except Vendor.DoesNotExist:
            return Response({"error": "Invalid vendor code"}, status=status.HTTP_400_BAD_REQUEST)

        # Vendor authenticated, generate JWT token
        token = AccessToken.for_user(Vendor)
        print(token)

        # You can customize the response data as needed
        response_data = {
            'access_token': str(token),
            'vendor_id': vendor.id,  # Optionally include vendor details in the response
            'vendor_name': vendor.name,
        }

        return Response(response_data, status=status.HTTP_200_OK)