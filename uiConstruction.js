(function( $, window, document, undefined ) {

	$.fn.uiConstruction = function( options ) {
	
		var o = $.extend({
			Logo: ['msaik'],
			Company: 'My Company Name',
			Title: '',
			SubTitle: '',
			Theme: 'white',
			Input: {show:true,mail:[]},
			Url: '',
			Social: {facebook:'ms',twitter:'tw',youtube:'you',type:'default'},
			Slide: {img:[],delay:6000,duration:'slow'}   
			}, options);
	
		var th = $(this);
		th.addClass(o.Theme).css('display','none');
		var prt = String.prototype;
		
		prt.trim = function() {return this.replace(/^\s*|\s*$/g, '');}
		prt.ap = function(e){return (e ? e.append(this) : th.append(this));}
		prt.wp = function(e){return (e ? e.wrap(this) : th.wrap(this));}
		prt.af = function(e){return (e ? e.after(this) : th.after(this));}
		prt.pr = function(){return th.prepend(this);}
		prt.checkmail = function(){var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/; if(!emailReg.test(this)) {return false;} else {return true;}}
		
		//prt.wr = function(){return th.wrapInner(this);}
		//var tit = th.getElementsByTagName("h1");
		
		//console.log(tit);
		
		var tx = {}
		tx.em = 'Enter email here';
		var cs = {}
		cs.sl = "cn-slide";
		var ob = {};
		ob.x = "<span class='cn-close'>X</span>";
		ob.c = "<h1>"+o.Company+"</h1>";
		ob.t = "<div class='ui-container-construction'>"+ob.c+"<h2>"+o.Title+"</h2><h3>"+o.SubTitle+"</h3></div>";
		ob.ip = "<div class='submit-construction'><input type='text' name='email' class='inp-email' placeholder='"+tx.em+"' /><span class='cn-error cn-mail-error'>Insert email valid</span><input type='submit' value='Submit' name='Submit' class='inp-submit' /></div>";
		ob.ma = "<div class='response-mail-construction'>Thanks for you subscription!!</div>";
		ob.sl = "<div class='"+cs.sl+"'></div>";
		ob.sl.af();
		//ob.c.ap();
		ob.x.ap();
		th.find('.cn-close').addClass('cn-hidden');
		ob.t.ap();
		var slide =o.Slide.img;
		ob.sl = $('.'+cs.sl);
		ob.sl.css('display','none');
		ob.ul = '<ul></ul>';
		
		ob.ul.ap(ob.sl);
		
		slide.forEach(function(e){
			$('.'+cs.sl+'> ul').append("<li><img src="+e+" /></li>");
		});
		ob.tl = $('.ui-container-construction');
		
		if(o.Input.show){
			ob.ip.ap(ob.tl);
			ob.ipt = $('.inp-email');
			//ob.ipt.val(tx.em).focus(function(){ob.ipt.val()==tx.em ? ob.ipt.val('') : ob.ipt.val();}).focusout(function(){ob.ipt.val()=='' ? ob.ipt.val(tx.em) : ob.ipt.val();});
		}
		var wc = th.width();
		//var he = th;
		var wb = $(window).width();
		
		ob.sl.slideUp(600).delay(400).fadeIn(400); 
			
		th.slideUp(300).delay(800).fadeIn(400);
		
		var n=0;
		var els = $('.'+cs.sl+'> ul li');
		var list = [];
		
		els.each(function(i, e) {
            list[i] = $(this);
        });
		list[0].addClass('active');
				
		list.sort();
		var i=1;
		var ii=0;
		if(list.length>1){
			setInterval(function() {
				if(i == list.length){i=0;}
				list[ii].removeClass('active');
				list[i].addClass('active');
				if(i !=0){ii++;}else{ii=0;}
				i++;
			}, o.Slide.delay);
		}
		
		$('.submit-construction').click(function(){$('.inp-email').focus();});
		
		$(function(){
			var scd = "<div class='social-icon "+o.Theme+"'><ul></ul></div>";
			scd.ap($('body'));
			var sc = false;
			$.each(o.Social,function(i, val){
				if(i!='type' && val !=''){
					$('.social-icon > ul').append('<li class="'+i+'"><span>'+i+'</span><a href="'+val+'">'+i+'</a>');
					sc = true;
				}
			});
			if(sc = true){$('.social-icon').slideUp(600).delay(1000).fadeIn(400);}
		});
		

		//Add Response to subscription
		ob.ma.af(ob.tl);
		$('.response-mail-construction').css('display','none');
		$('.inp-submit').click(function(){
			if(ob.ipt.val() != '' && ob.ipt.val().checkmail()){
				th.find('.ui-container-construction').fadeOut('fast',function(){
					th.find('.response-mail-construction').fadeIn('fast',function(){
						th.find('.cn-close').removeClass('cn-hidden');
						th.find('.cn-close').addClass('cn-show');	
					});
				});
				ob.ipt.val('');
				th.addClass('cn-inactive');
				th.removeClass('cn-active');
			} else {$('.cn-mail-error').css('height','12px'); setTimeout(function(){$('.cn-mail-error').css('height','0');},5000);}
		});
		$('.cn-close').click(function(){
			th.find('.response-mail-construction').fadeOut('fast',function(){
				th.find('.ui-container-construction').fadeIn('fast', function(){
					th.find('.cn-close').removeClass('cn-show');
					th.find('.cn-close').addClass('cn-hidden');
				});
			});
			th.addClass('cn-active');
			th.removeClass('cn-inactive');
		});
		
		$( window ).bind('resize load', function(){
			var dm = {h:th.height(),w:th.width(),wp:$(window).width(),hp:$(window).height()};
			var calc_h = dm.hp - dm.h ;
			var calc_w = dm.wp - dm.w ;
			th.css('top',calc_h /2);
			//th.css('left',calc_w /2);
		});
	}
	
})( jQuery, window, document );