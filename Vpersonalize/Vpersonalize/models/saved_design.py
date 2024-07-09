from odoo import models, fields

class VpersonalizeSavedDesign(models.Model):
    _name = 'vpersonalize.saved_design'
    _description = 'Saved Designs'

    cart_item_id = fields.Integer(string='Cart Item ID')
    vpersonalize_edit_id = fields.Char(string='Edit ID')
    vpersonalize_thumbnail = fields.Binary(string='Thumbnail')
    vpersonalize_thumbnail_url = fields.Char(string='Thumbnail Url')
    vpersonalize_design_token = fields.Char(string='Design Token')
    user_id = fields.Many2one('res.users', string='User')
    product_id = fields.Many2one('product.product', string='Product')
    product_url = fields.Char(string='Product URL')
    created_at = fields.Datetime(string='Created At', default=lambda self: fields.Datetime.now())
