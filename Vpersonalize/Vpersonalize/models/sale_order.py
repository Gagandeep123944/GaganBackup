from odoo import models, api

class SaleOrder(models.Model):
    _inherit = 'sale.order'

    @api.model
    def _cart_update(self, product_id=None, line_id=None, add_qty=0, set_qty=0, custom_attribute=None, **kwargs):
        result = super(SaleOrder, self)._cart_update(product_id, line_id, add_qty, set_qty, **kwargs)

        if custom_attribute and result.get('line_id'):
            line = self.env['sale.order.line'].browse(result['line_id'])
            line.custom_attribute = custom_attribute

        return result
