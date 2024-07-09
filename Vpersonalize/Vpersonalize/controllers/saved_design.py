from odoo import http
from datetime import datetime, timedelta
from odoo.http import request
import json

class SavedDesign(http.Controller):

    @http.route('/my/saved_design', type='http', auth="user", website=True)
    def saved_design(self, **kw):
        user_id = request.env.user.id
        last_30_days = datetime.now() - timedelta(days=30)
        saved_designs = request.env['vpersonalize.saved_design'].sudo().search([
            ('user_id', '=', user_id),
            ('created_at', '>=', last_30_days.strftime('%Y-%m-%d %H:%M:%S'))
        ])
        return request.render('Vpersonalize.vpersonalize_saved_design_template', {'saved_designs': saved_designs})

    @http.route('/vpersonalize/save_design', auth="public", website=True, methods=['POST'], csrf=False)
    def save_design_ajax(self, **kw):
        # Extract data from POST request
        cart_item_id = kw.get('cart_item_id')
        vpersonalize_edit_id = kw.get('vpersonalize_edit_id')
        vpersonalize_thumbnail = kw.get('vpersonalize_thumbnail')
        vpersonalize_design_token = kw.get('vpersonalize_design_token')

        product_id = kw.get('product_id')
        product_url = kw.get('product_url')

        

        # Get current user ID
        user_id = request.env.user.id

        # Create a new record in the model
        saved_design = request.env['vpersonalize.saved_design'].sudo().create({
            'cart_item_id': cart_item_id,
            'vpersonalize_edit_id': vpersonalize_edit_id,
            'vpersonalize_thumbnail': '',
            'vpersonalize_thumbnail_url':vpersonalize_thumbnail,
            'vpersonalize_design_token': vpersonalize_design_token,
            'user_id': user_id,
            'product_id': product_id,
            'product_url': product_url,
        })

        # Return response
        return json.dumps({
            'result': 'success',
            'message': 'Design saved successfully!',
            'saved_design_id': saved_design.id,
        })

    @http.route('/vpersonalize/remove_design', auth="public", website=True, methods=['POST'], csrf=False)
    def remove_design_ajax(self, **kw):
        # Extract data from POST request
        design_id = kw.get('design_id')
        
        design = request.env['vpersonalize.saved_design'].sudo().search([('id', '=', design_id)])
        
        if design:
            design.sudo().unlink()
            return json.dumps({'result': 'success', 'message': 'Design removed successfully!'})
        else:
            return json.dumps({'result': 'error', 'message': 'Design not found.','design_id':design_id})
