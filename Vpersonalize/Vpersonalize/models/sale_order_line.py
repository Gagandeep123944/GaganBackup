from odoo import models, fields

class SaleOrderLine(models.Model):
    _inherit = 'sale.order.line'

    custom_attribute = fields.Char(string="Custom Attribute")
