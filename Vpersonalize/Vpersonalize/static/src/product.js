




document.body.insertAdjacentHTML('beforeend', `<div id="loaderContainer" style="display:none;"><div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div><style>div#loaderContainer {z-index: 99999;height: 100vh;width: 100vw;background: #000000a8;position: fixed;left: 0px;top: 0px;align-items: center;justify-content: center;color: #000;}.lds-roller { color: #fff } .lds-roller, .lds-roller div, .lds-roller div:after { box-sizing: border-box; } .lds-roller { display: inline-block; position: relative; width: 80px; height: 80px; } .lds-roller div { animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite; transform-origin: 40px 40px; } .lds-roller div:after { content: " "; display: block; position: absolute; width: 7.2px; height: 7.2px; border-radius: 50%; background: currentColor; margin: -3.6px 0 0 -3.6px; } .lds-roller div:nth-child(1) { animation-delay: -0.036s; } .lds-roller div:nth-child(1):after { top: 62.62742px; left: 62.62742px; } .lds-roller div:nth-child(2) { animation-delay: -0.072s; } .lds-roller div:nth-child(2):after { top: 67.71281px; left: 56px; } .lds-roller div:nth-child(3) { animation-delay: -0.108s; } .lds-roller div:nth-child(3):after { top: 70.90963px; left: 48.28221px; } .lds-roller div:nth-child(4) { animation-delay: -0.144s; } .lds-roller div:nth-child(4):after { top: 72px; left: 40px; } .lds-roller div:nth-child(5) { animation-delay: -0.18s; } .lds-roller div:nth-child(5):after { top: 70.90963px; left: 31.71779px; } .lds-roller div:nth-child(6) { animation-delay: -0.216s; } .lds-roller div:nth-child(6):after { top: 67.71281px; left: 24px; } .lds-roller div:nth-child(7) { animation-delay: -0.252s; } .lds-roller div:nth-child(7):after { top: 62.62742px; left: 17.37258px; } .lds-roller div:nth-child(8) { animation-delay: -0.288s; } .lds-roller div:nth-child(8):after { top: 56px; left: 12.28719px; } @keyframes lds-roller { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>`);
const Loader={
    loader:document.querySelector('#loaderContainer'),
    show:function(){
        this.loader.style.display="flex";
    },
    hide:function(){
         this.loader.style.display="none";
    }
};


const url = new URL(window.location.href);


const params = new URLSearchParams(url.search);
let processed=0;

if (params.get('edit_design') === 'true') {
    
    Loader.show();
    
    console.log("edit the products");
    
    const allParams = {};
    const vpersonalizeEditId = params.get('vpersonalize_edit_id');
    const vpersonalizeToken = params.get('vpersonalize_token');

    var script = document.createElement('script');
    let designer_id=document.querySelector('[name="vpesonalize_id"]').value;
    let variant_id=document.querySelector('[name="product_id"]').value;
    const width = window.innerWidth;
    const deviceType = width <= 767 ? '3DViewMobile' : '3DViewEnterprise';
    script.src = 'https://www.launchmywear.com/flmw//service/3DViewEnterprise?callback=callbackfunction&enc_designer_id=3cdf866c7ba9f072781fcdeabd00ed4d&design_id='+designer_id+'&variant_id='+variant_id+'&themename=enterprise_2023&reloadDesign=true&static_guid='+vpersonalizeToken+'&static_design_id='+vpersonalizeEditId;
    script.type = 'text/javascript';
    document.body.appendChild(script);
    
    script.onload = function() {
        setTimeout(function(){
             reload3DT();
             Loader.hide();
        },3000)  
           
          
    }
    
    function callbackfunction(token, design_id){
        console.log(token);
        console.log(design_id);
        window.location.href="/shop/cart";
    }
        
    
}else if(params.get('add_saved_design') === 'true'){
    document.querySelector('#wrapwrap').style.visibility = "hidden";

    Loader.show();

    const vpersonalizeEditId = params.get('vpersonalize_edit_id');
    const vpersonalizeToken = params.get('vpersonalize_token');
    
    var sendData = localStorage.getItem('sendData');
    var {thumbnail} = JSON.parse(sendData);

    addToCartButton=document.querySelector('#add_to_cart');
    
    
    
    
    window.onload = function() {
        setTimeout(function(){
                        
            let thumbnailContainer=document.querySelector('[data-attribute_name="Vpersonalize Thumbnail"] [data-attribute_value_name="Url"]');

            let tokenContainer=document.querySelector('[data-attribute_name="Vpersonalize"] [data-attribute_value_name="Token"]');
              
            let editIDContainer=document.querySelector('[data-attribute_name="Vpersonalize Edit"] [data-attribute_value_name="Id"]');
            
            
            
            
            
            if(thumbnailContainer){
                thumbnailContainer.value=thumbnail;
            }
            
           
            
            if(tokenContainer){
                tokenContainer.value=vpersonalizeToken;
            }
            
            
            
            if(editIDContainer){
                editIDContainer.value=vpersonalizeEditId;
            }
           
            let variant_values = [];
            $('.js_variant_change:checked').each(function (key, element) {
                variant_values.push(parseInt($(element).val()));
            });
    
            
    
            var id = 3;
            var jsonrpc = "2.0";
            var method = "call";
            var product_id = parseInt($('[name="product_id"]').val());
    
            let product_custom_attribute_values = [];
            $('.variant_custom_value').each(function (key, element) {
                let custom_product_template_attribute_value_id = $(element).data('custom_product_template_attribute_value_id');
                let attribute_value_name = $(element).data('attribute_value_name');
                let custom_value = $(element).val();
    
                product_custom_attribute_values.push({ custom_product_template_attribute_value_id, attribute_value_name, custom_value });
            });
    
            var no_variant_attribute_values = "[]";
            var add_qty = 1;
            var display = false;
            var force_create = true;
    
            const data = {
                id: id,
                jsonrpc: jsonrpc,
                method: method,
                params: {
                    product_id: product_id,
                    product_custom_attribute_values: JSON.stringify(product_custom_attribute_values),
                    variant_values: variant_values,
                    no_variant_attribute_values: no_variant_attribute_values,
                    add_qty: add_qty,
                    display: display,
                    force_create: force_create
                }
            };
    
            fetch("/shop/cart/update_json", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                 window.location.href="/shop/cart";
            })
            .then(responseData => {
                console.log("Success:", responseData);
                
            })  
            .catch(error => {
                console.error("Error:", error);
                
            });
        },2000);
        localStorage.removeItem('sendData');
    }

    
}else if(params.get('edit_quantity') === 'true'){
    document.querySelector('#wrapwrap').style.visibility = "hidden";

    Loader.show();
    const vpersonalizeEditId = params.get('vpersonalize_edit_id');
    const vpersonalizeToken = params.get('vpersonalize_token');
    
    var sendData = localStorage.getItem('sendData');
    var {line_item_id,thumbnail,sizes,product_id,line_id,removeProducts} = JSON.parse(sendData);
    console.log(product_id);
    
    console.log(sendData);
  
    console.log(line_id);
    
    let processed=0;
    
    addToCartButton=document.querySelector('#add_to_cart');
    
    
    
    
    window.onload = function() {
        setTimeout(function(){
                        
            let thumbnailContainer=document.querySelector('[data-attribute_name="Vpersonalize Thumbnail"] [data-attribute_value_name="Url"]');

            let tokenContainer=document.querySelector('[data-attribute_name="Vpersonalize"] [data-attribute_value_name="Token"]');
              
            let editIDContainer=document.querySelector('[data-attribute_name="Vpersonalize Edit"] [data-attribute_value_name="Id"]');
            
            
            
            
            
            if(thumbnailContainer){
                thumbnailContainer.value=thumbnail;
            }
            
           
            
            if(tokenContainer){
                tokenContainer.value=vpersonalizeToken;
            }
            
            
            
            if(editIDContainer){
                editIDContainer.value=vpersonalizeEditId;
            }
            removeProducts.forEach(function(p){
                
                var {line_item_id,product_id,line_id}=p;

                $.ajax({
                  url: "/shop/cart/update_json",
                  method: "POST",
                  referrerPolicy: "strict-origin-when-cross-origin",
                  data: JSON.stringify({
                    id: parseInt(line_item_id),
                    jsonrpc: "2.0",
                    method: "call",
                    params: {
                      line_id: parseInt(line_id),
                      product_id: parseInt(product_id),
                      set_qty: 0,
                      display: true
                    }
                  }),
                  contentType: "application/json",
                  crossDomain: true,
                  xhrFields: {
                    withCredentials: true
                  },
                  success: function(response) {
                    console.log(response);
                  },
                  error: function(jqXHR, textStatus, errorThrown) {
                    console.error(textStatus, errorThrown);
                  }
                });
                })
            

        
        
            processToCart(sizes,processed);
        },2000);

        localStorage.removeItem('sendData');
    }
    
    
}else{    
    addToCartButton=document.querySelector('#add_to_cart');
    
    
    
    
    let customize_product=document.querySelector('#customize_product');
    
    
    
    
    
    
    
    console.log("Not loaded");
    if(customize_product){
        
        customize_product.addEventListener('click',function(){
    
            
            
            let sizes=[];
            let total_quantity=0;
            jQuery('.bulk-input').each(function(){
                if(jQuery(this).val()>0 ){
                    let size=parseInt(jQuery(this).attr('size-id'));
                    let quantity=parseInt(jQuery(this).val());
                    sizes.push({size,quantity});
                    total_quantity+=quantity;
                }
                
            });
    
            if(total_quantity>0){
                callP3dt();
            }else{
                alert("Please Enter Size Quanity");
            }
            
        });
        
        var script = document.createElement('script');
            
        let designer_id=document.querySelector('[name="vpesonalize_id"]').value;
        let variant_id=document.querySelector('[name="product_id"]').value;
        const width = window.innerWidth;
        const deviceType = width <= 767 ? '3DViewMobile' : '3DViewEnterprise';
        script.src = 'https://www.launchmywear.com/flmw//service/'+deviceType+'?emethod=woocommerce&callback=callback3dt&enc_designer_id=3cdf866c7ba9f072781fcdeabd00ed4d&design_id='+designer_id+'&variant_id='+variant_id+'&themename=enterprise_2023&reloadDesign=false';
        script.type = 'text/javascript';
        document.body.appendChild(script);
            
         window.onload = function() {
            
            
    
        
             
                     
                     
            
            if(designer_id.length>0){
               
                setTimeout(function(){
                    
                    let thumbnailContainer=document.querySelector('[data-attribute_name="Vpersonalize Thumbnail"] [data-attribute_value_name="Url"]');
    
                    let tokenContainer=document.querySelector('[data-attribute_name="Vpersonalize"] [data-attribute_value_name="Token"]');
                      
                    let editIDContainer=document.querySelector('[data-attribute_name="Vpersonalize Edit"] [data-attribute_value_name="Id"]');
                    
                    if(thumbnailContainer==null){
                    
                        customize_product.style.display="none";
                        addToCartButton.style.display="block";
                        
                        alert(`Vpersonalize Settings Required for this Product. If you ar e admin Please Select Vpersonalize Thumbnail Attritbute and Choose Url as Value`); 
                        
                    }else if(tokenContainer==null){
                        
                        customize_product.style.display="none"; 
                        addToCartButton.style.display="block";
                        
                        alert(`Vpersonalize Settings Required for this Product. If you ar e admin Please Select Vpersonalize  Attritbute and Choose Token as Value`);
                        
                    }else if(editIDContainer==null){
                        
                        customize_product.style.display="none";
                        addToCartButton.style.display="block";
                        
                        alert(`Vpersonalize Settings Required for this Product. If you ar e admin Please Select Vpersonalize Edit Attritbute and Choose Id as Value`);
                    }
                },2000)
                
                
            
                
                
            }else{
                
                customize_product.style.display="none";
                addToCartButton.style.display="block";
                
            }
        };
        
            
        function callback3dt(token, design_id){
            console.log(token);
            console.log(design_id);
            
            let thumbnailContainer=document.querySelector('[data-attribute_name="Vpersonalize Thumbnail"] [data-attribute_value_name="Url"]');
    
            let tokenContainer=document.querySelector('[data-attribute_name="Vpersonalize"] [data-attribute_value_name="Token"]');
             
            let editIDContainer=document.querySelector('[data-attribute_name="Vpersonalize Edit"] [data-attribute_value_name="Id"]');
            const d = new Date();
            let time = d.getTime();
            let url="https://www.launchmywear.com/cbdata/"+token+"/"+design_id+".jpg?t="+time;
            if(thumbnailContainer){
                thumbnailContainer.value=url;
            }
            
           
            
            if(tokenContainer){
                tokenContainer.value=token;
            }
            
            
            
            if(editIDContainer){
                editIDContainer.value=design_id;
            }
            
    
    
    
    
           
    
            let sizes=[];
            let total_quantity=0;
            jQuery('.bulk-input').each(function(){
                if(jQuery(this).val()>0 ){
                    let size=parseInt(jQuery(this).attr('size-id'));
                    let quantity=parseInt(jQuery(this).val());
                    sizes.push({size,quantity});
                    total_quantity+=quantity;
                }
                
            });
            
            
            
            
            processToCart(sizes,processed);
    
            
            
            
        }
    }else{
        addToCartButton.style.display="block";
    }
    
    
    
    
}

    function processWithSync(sizes){
        let element= sizes[processed];
        
        $('[data-attribute_name="Size"][value="'+element.size+'"]').prop('checked','checked').trigger('change');
        
        

    
        setTimeout(function(){
            console.log(element);
            addProductToCart(element.quantity, element.size)
            .then(response => {
                console.log("Cart updated:", response);
                processed++;
                processToCart(sizes);
            })
            .catch(error => {
                console.error("Failed to update cart:", error);
                processed++;
                processToCart(sizes);
            });
        },2000)
    }
    
    
    
    function processToCart(sizes){
        if(sizes.length<=processed){
            console.log("All things added");
            window.location.href="/shop/cart";
        }else{
            processWithSync(sizes);
        }
        
    }
    
    
    function addProductToCart(quantity, size) {
        return new Promise((resolve, reject) => {
    
    
           
    
    
            
            let variant_values = [];
            $('.js_variant_change:checked').each(function (key, element) {
                if ($(element).data('attribute_name') != "Size") {
                    variant_values.push(parseInt($(element).val()));
                }
            });
    
            variant_values.push(size);
    
            var id = 3;
            var jsonrpc = "2.0";
            var method = "call";
            var product_id = parseInt($('[name="product_id"]').val());
    
            let product_custom_attribute_values = [];
            $('.variant_custom_value').each(function (key, element) {
                let custom_product_template_attribute_value_id = $(element).data('custom_product_template_attribute_value_id');
                let attribute_value_name = $(element).data('attribute_value_name');
                let custom_value = $(element).val();
    
                product_custom_attribute_values.push({ custom_product_template_attribute_value_id, attribute_value_name, custom_value });
            });
    
            var no_variant_attribute_values = "[]";
            var add_qty = quantity;
            var display = false;
            var force_create = true;
    
            const data = {
                id: id,
                jsonrpc: jsonrpc,
                method: method,
                params: {
                    product_id: product_id,
                    product_custom_attribute_values: JSON.stringify(product_custom_attribute_values),
                    variant_values: variant_values,
                    no_variant_attribute_values: no_variant_attribute_values,
                    add_qty: add_qty,
                    display: display,
                    force_create: force_create
                }
            };
    
            fetch("/shop/cart/update_json", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(responseData => {
                console.log("Success:", responseData);
                resolve(responseData);
            })  
            .catch(error => {
                console.error("Error:", error);
                reject(error);
            });
        });
    }
