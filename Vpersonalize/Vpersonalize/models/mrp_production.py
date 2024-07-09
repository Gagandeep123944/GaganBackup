from odoo import models, fields, api

class MrpProduction(models.Model):
    _inherit = 'mrp.production'

    x_studio_print_url = fields.Char(string='Print URL', compute='_compute_print_url', readonly=True)
    @api.depends()
    def _compute_print_url(self):
        for production in self:
            production.x_studio_print_url = 'https://thesublimationstation.odoo.com'
