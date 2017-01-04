$(document).ready(function() {



	/*

	 Advanced example - Customized layout

	 */

	$('a[data-fancybox="cl-group"]').fancybox({

		mainClass : 'fancybox-custom-layout',
		margin    : 0,
		infobar   : false,
		thumbs    : {
			hideOnClosing : false
		},
		touch : {
			vertical : "auto"
		},
		// Customize caption area - append an dad to the bottom

		caption : function( instance ) {

			var ad = '<div class="ad"><p><a href="//fancyapps.com/fancybox/">fancyBox3</a> - touch enabled, responsive and fully customizable lightbox script</p></div>';

			return ad + ( $(this).data('caption') || '' );

		}
	});



	/*

	 Advanced example - Morphing modal window

	 */

	function retrieveScale( btn ) {

		var rez = Math.max( $(window).height() * 2 / btn.height() , $(window).width() * 2 / btn.width() );

		return rez;

	}

	// Add wrapping element and set width for the horizontal centering

	$(".open_morphing").wrap(function() {

		var $wrap = $('<div class="morphing-btn-wrap"></div>');

		$wrap.width( $(this).outerWidth( true ) );

		return $wrap;

	});


	$(".open_morphing").on('click', function(e) {

		var $that = $(this);
		var $clone;

		e.preventDefault();

		if ( $that.hasClass('to-circle') ) {
			return;
		}

		// Start morphing animation

		$that.on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(e) {

			if ( e.originalEvent.propertyName !== 'width' ) {
				return;
			}

			$that.unbind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');

			var scale	= retrieveScale( $that );
			var pos		= $that[0].getBoundingClientRect();

			$clone = $('<div />')
				.addClass('clone')
				.css({
					top			: pos.top  + $that.outerHeight() * 0.5 -  ( $that.outerHeight() * scale * 0.5 ),
					left		: pos.left + $that.outerWidth()  * 0.5  - ( $that.outerWidth()  * scale * 0.5 ),
					width		: $that.outerWidth()  * scale,
					height		: $that.outerHeight() * scale,
					transform	: 'scale(' + 1 / scale + ')'
				})
				.insertAfter( $that );

			// Trigger repaint

			$clone.hide().show(0);

			$clone.addClass('is-visible');

			// Open fancyBox

			setTimeout(function() {

				$.fancybox.open(
					{
						src : $that.data('src') || $that.attr('href')
					},
					{
						infobar  : false,
						buttons  : false,
						smallBtn : false,

						onInit	: function(instance) {

							instance.$refs.slider_wrap.append('<button class="morphing-close" data-fancybox-close>X</button>');

							instance.$refs.bg.remove();

						},

						afterClose	: function() {

							// Clean up

							var scale	= retrieveScale( $that );
							var pos		= $that[0].getBoundingClientRect();

							$clone.css({
								top			: pos.top  + $that.outerHeight() * 0.5 -  ( $that.outerHeight() * scale * 0.5 ),
								left		: pos.left + $that.outerWidth()  * 0.5  - ( $that.outerWidth()  * scale * 0.5 ),
								width		: $that.outerWidth()  * scale,
								height		: $that.outerHeight() * scale,
								transform	: 'scale(' + ( 1 / scale ) + ')'
							});

							$clone.removeClass('is-visible');

							$clone.one('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(e) {

								$clone.remove();

								$that.removeClass('to-circle');

							});

						}
					}
				);

			}, 350);

		});

		$that.width( $that.width() ).hide().show(0).addClass('to-circle');

	});



	/*

	 Advanced example - Confirm dialog

	 */

	function myConfirm( opts ) {

		$.fancybox.open(
			'<div class="my_dialog">' +
			'<h3>' + opts.title + '</h3>' +
			'<p>' + opts.message + '</p>' +
			'<p class="tright">' +
			'<a data-value="0" data-fancybox-close>Cancel</a>' +
			'<button data-value="1" data-fancybox-close class="btn">Ok</button>' +
			'</p>' +
			'</div>', {
				smallBtn   : false,
				buttons    : false,
				keyboard   : false,
				afterClose : function( instance, e ) {
					var button = e ? e.target || e.currentTarget : null;
					var value  = button ? $(button).data('value') : 0;

					opts.callback( value );
				}
			}
		);

	}


	$("#test_confirm").click(function() {

		myConfirm({
			title    : 'Are you sure?',
			message  : 'By the way, there are many possibilities for modal dialog to appear using CSS transitions.',
			callback : function (value) {
				if (value) {
					$("#test_confirm_rez").html("Let's do this!")
				} else {
					$("#test_confirm_rez").html("Maybe later.")
				}
			}
		});

	});


	/*

	 Advanced example - Product quick view

	 */

	$(".quick_view").fancybox({

		mainClass	: 'quick-view-container',
		infobar		: false,
		buttons		: false,
		thumbs		: false,
		margin      : 0,
		touch       : {
			vertical : false
		},
		mainTpl     : '<div class="fancybox-container" role="dialog">' +
		'<div class="quick-view-content">' +
		'<div class="quick-view-carousel">' +
		'<div class="fancybox-slider-wrap"><ul class="fancybox-slider"></ul></div>' +
		'</div>' +
		'<div class="quick-view-aside"></div>' +
		'<button data-fancybox-close class="quick-view-close">X</button>' +
		'</div>' +
		'</div>',

		onInit : function( instance ) {

			/*

			 Create bullet navigation links

			 */

			var bullets = '<ul class="quick-view-bullets">';

			for ( var i = 0; i < instance.group.length; i++ ) {
				bullets += '<li><a data-index="' + i + '" href="javascript:;"><span>' + ( i + 1 ) + '</span></a></li>';
			}

			bullets += '</ul>';

			$( bullets ).on('click touchstart', 'a', function() {
				var index = $(this).data('index');

				$.fancybox.getInstance(function() {
					this.jumpTo( index );
				});

			})
				.appendTo( instance.$refs.container.find('.quick-view-carousel') );


			/*

			 Add product form

			 */

			var $element = instance.group[ instance.currIndex ].opts.$orig;
			var form_id = $element.data('qw-form');

			instance.$refs.container.find('.quick-view-aside').append( $( '#' + form_id ).clone( true ).removeClass('hidden') );

		},

		beforeMove : function( instance ) {

			/*
			 Set active current navigation link
			 */

			instance.$refs.container.find('.quick-view-bullets').children().removeClass('active').eq( instance.currIndex ).addClass('active');

		}

	});


});