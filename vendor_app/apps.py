from django.apps import AppConfig


class VendorAppConfig(AppConfig):
    name = 'vendor_app'

    def ready(self):
        import vendor_app.signals
