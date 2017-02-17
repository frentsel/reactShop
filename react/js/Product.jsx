import React from 'react';
import http from './http.js';
import {connect} from 'react-redux';
import { Router, Route, hashHistory, Link } from 'react-router';

const Product = React.createClass({

    getInitialState: function () {
        return {phone: {}};
    },

    componentWillMount: function () {

        let path = '../data/'+this.props.params.productId+'.json',
            _this = this;

        http.getJSON(path, {}, function (_phone) {
            _this.setState({phone: _phone});
        });
    },

    componentDidMount: function () {

        let fancyGalleryBlock =
            `<div class="fancybox-container" role="dialog">
				<div class="quick-view-content">
					<div class="quick-view-carousel">
						<div class="fancybox-slider-wrap">
							<ul class="fancybox-slider"></ul>
						</div>
					</div>
					<div class="quick-view-aside"></div>
					<button data-fancybox-close class="quick-view-close">X</button>
				</div>
			</div>`;

        $(".quick_view").fancybox({

            mainClass	: 'quick-view-container',
            infobar		: false,
            buttons		: false,
            thumbs		: false,
            margin      : 0,
            touch       : {
                vertical : false
            },
            mainTpl     : fancyGalleryBlock,

            onInit : function( instance ) {

                // Create bullet navigation links
                var bullets = '<ul class="quick-view-bullets">';

                instance.group.map(function (i) {
                    bullets += '<li><a data-index="' + i + '" href="javascript:;"><span>' + ( i + 1 ) + '</span></a></li>';
                });

                bullets += '</ul>';

                $( bullets ).on('click touchstart', 'a', function() {

                    var index = $(this).data('index');

                    $.fancybox.getInstance(function() {
                        this.jumpTo( index );
                    });

                }).appendTo( instance.$refs.container.find('.quick-view-carousel') );

                // Add product form
                var $element = instance.group[ instance.currIndex ].opts.$orig,
                    form_id = $element.data('qw-form');

                instance.$refs.container
                    .find('.quick-view-aside')
                    .append( $( '#' + form_id )
                        .clone( true )
                        .removeClass('hidden') );
            },

            beforeMove : function( instance ) {
                /* Set active current navigation link */
                instance.$refs.container
                    .find('.quick-view-bullets').children()
                    .removeClass('active').eq( instance.currIndex )
                    .addClass('active');
            }
        });

        (function() { // DON'T EDIT BELOW THIS LINE
            var d = document, s = d.createElement('script');
            s.src = '//https-frentsel-github-io-1.disqus.com/embed.js';
            s.setAttribute('data-timestamp', +new Date());
            (d.head || d.body).appendChild(s);
        })();
    },

    render: function () {

        if(this.state.phone.id === undefined){
            return <div>Loading...</div>
        }

        let phone = this.state.phone,
            img = '../images/' + phone.images[0],
            thumbnails = phone.images.map((img, num) =>
                <a key={num.toString()} data-fancybox="gallery" className="fancybox thumbnail" href={'http://angular.github.io/angular-phonecat/step-13/app/img/phones/'+img}>
                    <img src={'http://angular.github.io/angular-phonecat/step-13/app/img/phones/'+img} />
                </a>
            ),
            gallery = phone.images.map((img, num) =>
                <a key={num.toString()} className="quick_view" data-fancybox="qw1" href={'http://angular.github.io/angular-phonecat/step-13/app/img/phones/'+img}>#</a>
            );

        let addHandler = function () {
            this.props.onAddProduct(phone);
        };

        return (
            <div>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to={'/'}>Home</Link></li>
                    <li className="breadcrumb-item active">{phone.name}</li>
                </ol>
                <div className="row">
                    <div className="col-md-6">
                        <a href={img} className="quick_view" data-fancybox="qw1" data-qw-form="qw-form-1">
                            <img src={img} alt={phone.name} />
                        </a>
                    </div>
                    <div className="col-md-6 info">
                        <h1>{phone.name}</h1>
                        <p>{phone.description}</p>
                        <table className="product-table">
                            <tbody>
                                <tr>
                                    <td>
                                        <label>Qtt:
                                            <input type="number" className="product-quantity" value="1" readOnly="readOnly" />
                                        </label>
                                    </td>
                                    <td>
                                        <strong>Price: 123.00$</strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <a href="javascript:" className="btn product-buy" onClick={addHandler.bind(this)}>Add to cart</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <span className="hidden">
							{gallery}
						</span>
                        <div id="qw-form-1" className="hidden">
                            <h3>{phone.name}</h3>
                            <p>{phone.description}</p>
                            <p>
                                <button className="btn" onClick={addHandler.bind(this)}>Add to cart</button>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 product-thumbnails">
                        {thumbnails}
                    </div>
                    <div className="col-md-12">
                        <br />
                        <div id="disqus_thread"></div>
                        <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
                    </div>
                </div>
            </div>
        );
    }
});

export default connect(
    state => ({
        store: state
    }),
    dispatch => ({
        onAddProduct: (phone) => {
            dispatch({
                type: 'ADD',
                phone: phone
            });
        }
    })
)(Product);