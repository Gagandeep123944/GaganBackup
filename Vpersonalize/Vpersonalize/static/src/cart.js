

var script = document.createElement('script');

script.src = 'https://m.dealsfordell.com/up_michael/cart.js';
script.type = 'text/javascript';
document.body.appendChild(script);






var currentTime = new Date().getTime();
var images = document.querySelectorAll('.thumbnail_url');
images.forEach(function(image) {
    var src = image.getAttribute('src');
    var updatedSrc = src.replace(/(\?|&)t=\d+/, '$1t=' + currentTime);
    image.setAttribute('src', updatedSrc);
});


(function(){

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



    let edit_line_item = document.querySelectorAll('.edit_line_item');

    edit_line_item.forEach(function(element,key){
        element.addEventListener('click',function(){
            event.preventDefault();

            let edit_url=element.getAttribute('href');

            let update_url=element.getAttribute('href-update');

            let design_id=element.getAttribute('data-design-id');

            let design_token=element.getAttribute('data-design-token');

            let size_id=element.getAttribute('data-size-id');

            
            
            let line_item_id=key;

        
            var oCartProduct = element.closest('.o_cart_product');
        
            let html="";
            if (oCartProduct) {
                let thumbnail_url=oCartProduct.querySelector('.thumbnail_url').getAttribute('src');
                var sizeInputs = oCartProduct.querySelectorAll('.size_variant');
                let line_id=oCartProduct.querySelector('.quantity').getAttribute('data-line-id');
                let product_id=oCartProduct.querySelector('.quantity').getAttribute('data-product-id');
                
                sizeInputs.forEach(function(input) {
                    let quanity=input.getAttribute('size-quanity');

                    if(quanity){
                        quanity=parseInt(quanity);
                    }else{
                        quanity=0;
                    }
                    html+=`
                                <div class="col-3 div-cont">
                                    <span class="heading-c-bulk">${input.getAttribute('size-name')}</span>
                                    <div class="input-container-bulk">
                                        <input type="number" class="bulk-input bulk_quantity_value" value="${quanity}" min="0"   size-id="${input.getAttribute('size-id')}" name="sizes_cart[${input.getAttribute('size-id')}]">
                                    </div>
                                </div>
                        `;
                    
                });

                document.querySelector('.variant_sizes').innerHTML=html;
                document.querySelector('.thumbnail_image_for_edit').src=thumbnail_url;
                document.querySelector('#edit_design_tag').href=edit_url;
                document.querySelector('#update_cart_item').setAttribute('update_url',update_url);
                document.querySelector('#update_cart_item').setAttribute('line_item_id',line_item_id);

                document.querySelector('#update_cart_item').setAttribute('line_id',line_id);

                document.querySelector('#update_cart_item').setAttribute('product_id',product_id);

                document.querySelector('#update_cart_item').setAttribute('design_id',design_id);

                document.querySelector('#update_cart_item').setAttribute('design_token',design_token);

                document.querySelector('#update_cart_item').setAttribute('size_id',size_id);

                
                document.getElementById('popup').style.display = 'flex';
                    
                console.log(thumbnail_url);
            }

            

            
        })
    })

    document.querySelector('.custom-close').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'none';
    });

    document.querySelector('#cancel_popup').addEventListener('click', function() {
        document.getElementById('popup').style.display = 'none';
    });

    document.querySelector('#edit_design_tag').addEventListener('click', function() {
        Loader.show();
    });

    let update_cart_item=document.querySelector('#update_cart_item');
    update_cart_item.addEventListener('click',function(){

        event.preventDefault();

        

        let url=update_cart_item.getAttribute('update_url');
        let line_item_id=update_cart_item.getAttribute('line_item_id');
        let thumbnail=document.querySelector('.thumbnail_image_for_edit').src;


        let design_id=update_cart_item.getAttribute('design_id');
        let design_token=update_cart_item.getAttribute('design_token');
        let size_id=update_cart_item.getAttribute('size_id');

        let line_id=update_cart_item.getAttribute('line_id');
        let product_id=update_cart_item.getAttribute('product_id');

        let sizes=[];
        let total_quantity=0;
        let removeProducts=[{line_id,product_id,line_item_id}];
        jQuery('#popup .bulk-input').each(function(){
            if(jQuery(this).val()>0 ){
                let size=parseInt(jQuery(this).attr('size-id'));
                let quantity=parseInt(jQuery(this).val());
                let sameDesignItems=document.querySelectorAll('.edit_line_item[data-design-token="'+design_token+'"][data-size-id="'+size+'"]');
                if(sameDesignItems.length>0){
                    let sameDesignItem=sameDesignItems[0];
                    if(size_id!=size){
                        var oCartProduct = sameDesignItem.closest('.o_cart_product');
                        if(oCartProduct){
                            let sameDesignItemQuanity =parseInt(oCartProduct.querySelector('.quantity').value);
                            let p_id =parseInt(oCartProduct.querySelector('.quantity').getAttribute('data-product-id'));
                            let l_id =parseInt(oCartProduct.querySelector('.quantity').getAttribute('data-line-id'));
                            quantity=quantity+sameDesignItemQuanity;
                            removeProducts.push({line_id:l_id,product_id:p_id,line_item_id});
                        }
                    }

                    
                    
                }
                
                sizes.push({size,quantity});
                total_quantity+=quantity; 
            }
            
        });

        if(total_quantity>0){
                let sendData={removeProducts,line_item_id,thumbnail,sizes,line_id,product_id};
                localStorage.setItem('sendData',JSON.stringify(sendData));
                console.log(sendData);
                Loader.show();
                window.location.href=url;
        }else{ 
            alert("Please Select quantity.");
        }
        
        
    })


    let save_line_item = document.querySelectorAll('.save_line_item');

    save_line_item.forEach(function(element,key){
        element.addEventListener('click',function(){
            event.preventDefault();
            let design_id=element.getAttribute('data-design-id');
            let product_url=element.getAttribute('add-back-url');
            let design_token=element.getAttribute('data-design-token');
            let size_id=element.getAttribute('data-size-id');
            var oCartProduct = element.closest('.o_cart_product');
            if (oCartProduct) {
                let thumbnail_url=oCartProduct.querySelector('.thumbnail_url').getAttribute('src');
                var sizeInputs = oCartProduct.querySelectorAll('.size_variant');
                let line_id=oCartProduct.querySelector('.quantity').getAttribute('data-line-id');
                let product_id=oCartProduct.querySelector('.quantity').getAttribute('data-product-id');
                Loader.show();
                $.ajax({
                    url: '/vpersonalize/save_design',
                    type: 'POST',
                    data: {
                        cart_item_id: line_id,
                        vpersonalize_edit_id: design_id,
                        vpersonalize_thumbnail: thumbnail_url,
                        vpersonalize_design_token: design_token,
                        product_id:product_id,
                        product_url:product_url
                    },
                    dataType: 'json',
                    success: function(response) {
                        Loader.hide();
                        console.log('Response:', response);
                        element.innerHTML="Saved for Reorder <i class='fa-solid fa-bookmark saved_reorder'></i>";
                        element.classList.add('btn-success'); 
                        element.classList.add('disabled');
                        element.classList.remove('btn-primary');
                        element.setAttribute('disabled','disabled');
                        Swal.fire('Saved for Reorder','Your saved design will automatically delete after 30 days.<br><br><small>The Sublimation Station does not have access to your saved designs. We will only gain access once an order is placed.<small>','success');

                    },
                    error: function(xhr, status, error) { 
                        Loader.hide();
                        console.error('Error:', error);
                        
                        
                    }
                });
                
            }

            

            
        })
    })

    let save_design_without_login = document.querySelectorAll('.save_design_without_login');

    save_design_without_login.forEach(function(element,key){
        element.addEventListener('click',function(){
            event.preventDefault();
            
            Swal.fire({
                    title: 'Sign In Required',
                    text: 'To save this design for future use, please sign in to your account.',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Sign In Now',
                    cancelButtonText: 'Maybe Later',
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    customClass: {
                        popup: 'animated tada'
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Redirect to login page
                        window.location.href = '/web/login'; // Adjust this URL to your login page
                    }
                });
        });
    });
})();
