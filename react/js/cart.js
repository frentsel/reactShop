window.Cart = function() {
	return (
		<div>
			<ol className="breadcrumb">
				<li className="breadcrumb-item"><a href="#/">Home</a></li>
				<li className="breadcrumb-item active">Shopping Cart</li>
			</ol>
			<h1>Shoping cart</h1>
			<div className="alert alert-info alert-dismissible" role="alert">
				<button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>
				Your shopping cart is empty.
			</div>
		</div>
	);
};