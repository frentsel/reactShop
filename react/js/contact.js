window.Contact = function() {
	return (
		<div>
			<h1>Contact form</h1>
			<div className="row">
				<div className="col-md-6">
					<form className="form-horizontal" onsubmit="return false;">
						<div className="form-group">
							<label for="inputEmail3" className="col-sm-2 control-label">Email</label>
							<div className="col-sm-10">
								<input type="email" className="form-control" name="email" id="inputEmail3" placeholder="Email" required />
							</div>
						</div>
						<div className="form-group">
							<label for="Name" className="col-sm-2 control-label">Name</label>
							<div className="col-sm-10">
								<input type="text" className="form-control" name="name" id="Name" placeholder="Name" required />
							</div>
						</div>
						<div className="form-group">
							<label for="Message" className="col-sm-2 control-label">Message</label>
							<div className="col-sm-10">
								<textarea name="Message" className="form-control contact-textarea" id="Message" cols="30" rows="3" placeholder="Text..."></textarea>
							</div>
						</div>
						<div className="form-group">
							<div className="col-sm-offset-2 col-sm-10">
								<button type="submit" className="btn btn-default">Send message</button>
							</div>
						</div>
					</form>
				</div>
				<div className="col-md-6">
					<img border="0" src="../img/staticmap.png" className="contact-map" />
				</div>
			</div>
			<div className="row">
				<div className="col-md-12">
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium amet architecto aut deleniti dolor dolorem dolores eaque ex facilis harum, labore laborum libero minus nostrum numquam odio qui quibusdam quos rerum soluta tempora voluptates voluptatum!</p>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci ea, error hic ipsum quia quis similique sit?</p>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium alias aperiam aut autem blanditiis consectetur, delectus deserunt ex illo illum, ipsam iste labore molestiae mollitia natus neque nihil, perferendis quae quis ratione sequi suscipit veniam! Amet architecto atque, consequatur consequuntur dolores ex excepturi exercitationem facilis fugiat illum itaque labore necessitatibus officiis quae unde!</p>
				</div>
			</div>
		</div>
	);
};