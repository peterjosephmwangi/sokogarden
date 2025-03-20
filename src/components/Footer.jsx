import React from 'react';

const Footer = () => {
  return (
    <div>
      <section className="row text-white  p-4">
        <div className="col-md-4">
          <h4 className="text-center">About Us</h4>
          <p>
            We are a leading electronics shop offering the latest gadgets, home appliances, and accessories at unbeatable prices. Our mission is to provide top-quality products with exceptional customer service.
          </p>
          <p>
            Whether you're looking for smartphones, laptops, gaming consoles, or home entertainment systems, we have everything you need to stay connected and entertained.
          </p>
        </div>
        <div className="col-md-4">
          <h4 className="text-center">Contact Us</h4>
          <form>
            <input type="email" placeholder="Enter your email" className="form-control" />
            <br />
            <textarea placeholder="Leave a message" rows="5" className="form-control"></textarea>
            <br />
            <input type="button" value="Send Message" className="btn btn-outline-danger" />
          </form>
        </div>
        <div className="col-md-4">
          <h4 className="text-center">Stay Connected</h4>
          <br />
          <a href="https://www.facebook.com"><img src="https://modcom2.pythonanywhere.com/static/images/fb.png" alt="Facebook" /></a>
          <a href="https://www.instagram.com"><img src="https://modcom2.pythonanywhere.com/static/images/in.png" alt="Instagram" /></a>
          <a href="https://www.twitter.com"><img src="https://modcom2.pythonanywhere.com/static/images/x.png" alt="Twitter" /></a>
          <p className="text-dark">
            Follow us on social media for the latest product updates, exclusive deals, and special promotions. Stay ahead with the newest technology trends!
          </p>
        </div>
      </section>
      <footer className="text-white bg-dark text-center p-2">
        <h5>Developed by Bernard. &copy; 2024. All rights reserved.</h5>
      </footer>
    </div>
  );
};

export default Footer;
