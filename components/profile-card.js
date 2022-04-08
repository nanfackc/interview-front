const template = document.createElement('template');
template.innerHTML = `
  <style>
  @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css");

.profile-card {
  width: 340px;
  height: 480px;
  background-color: #fff;
  box-shadow: 0px 20px 60px 0px rgba(0, 0, 0, 0.2);
  border-radius: 25px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto 25%;
}

.main {
  position: relative;
  background: var(--profile-card-image);
  background-position: top;
  background-size: cover;
  background-repeat: no-repeat;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 15px;
  padding-bottom: 40px;
  transition: padding-bottom 0.4s;
}

.main::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0%;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, #033074, #ffc107);
  opacity: 0.4;
}

.main p {
  position: relative;
  color: #fff;
  font-size: 1.4em;
  letter-spacing: 1px;
}

p.name {
  font-size: 2em;
  letter-spacing: 1.5px;
  font-weight: bold;
  margin-bottom: 6px;
}

.more {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f3f8fa;
  color: #222;
  font-size: 1.2em;
  letter-spacing: 0.7px;
}

.more .social-links {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 22px;
  margin: 14px;
}

.social-links a {
  text-decoration: none;
  padding: 0;
  width: 30px;
  height: 30px;
  border: 3px solid;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
}

.info {
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.info section p {
  color: #708d9b;
  text-align: center;
  letter-spacing: 0.7px;
  font-size: 1.2em;
  margin-bottom: 8px;
}

.info section p.value {
  color: #344e5a;
  font-weight: bold;
}

.info button {
  background-color: #ffc107;
  border: none;
  border-radius: 50%;
  outline: none;
  color: #fff;
  box-shadow: 0px 5px 25px 0px rgba(0, 0, 0, 0.4);
  width: 40px;
  height: 40px;
  font-size: 2em;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: width 0.4s, height 0.4s;
}

.info button i.fa-minus {
  display: none;
}

/* Card Closed / Opened */

.more {
  height: 0;
  overflow: hidden;
  transition: height 0.4s;
}

.profile-card.opened .more {
  height: 180px;
}

.profile-card.opened .main {
  padding-bottom: 5px;
  box-shadow: 0 0 10px #c0c6c8;
}

.profile-card.opened .info {
  box-shadow: 0 0 25px #c9d1d4;
}

.profile-card.opened i.fa-minus {
  display: block;
}
.profile-card.opened i.fa-plus {
  display: none;
}

.profile-card.opened .info button {
  width: 60px;
  height: 60px;
  font-size: 1.3em;
}

/* Social links colors */

a.facebook {
  color: #3b5999;
}

a.youtube {
  color: #ff0000;
}

a.github {
  color: #333;
}

a.linkedin {
  color: #0077b5;
}

a.twitter {
  color: #55acee;
}

a.googleplus {
  color: #dd4b39;
}
  </style>
  <div class="profile-card">
  <section class="main" id="main">
      <img />
      <p id="fullName" class="name">John Elliot</p>
      <p id="title">UX/UI Frontend Developer</p>
  </section>

  <section class="more">
      <br>discover more about me...</br>
      <div class="social-links">
          <a href="#" class="facebook">
              <i class="fab fa-facebook-f"></i>
          </a>
          <a href="#" class="youtube">
              <i class="fab fa-youtube"></i>
          </a>
          <a href="#" class="github">
              <i class="fab fa-github"></i>
          </a>
          <a href="#" class="linkedin">
              <i class="fab fa-linkedin-in"></i>
          </a>
          <a href="#" class="twitter">
              <i class="fab fa-twitter"></i>
          </a>
          <a href="#" class="googleplus">
              <i class="fab fa-google-plus-g"></i>
          </a>
      </div>
  </section>
  <section class="info">
      <section>
          <p>Posts</p>
          <p class="value" id="post">85</p>
      </section>
      <section>
          <p>Likes</p>
          <p class="value" id="likes">2350</p>
      </section>
      <section>
          <p>Comments</p>
          <p class="value" id="comments">186</p>
      </section>
      <button id="openerBtn">
          <i class="fas fa-plus"></i>
          <i class="fas fa-minus"></i>
      </button>
  </section>
</div>
`;

class ProfileCard extends HTMLElement {
  constructor() {
    super();

    this.showInfo = true;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  toggleInfo() {
    const card = this.shadowRoot.querySelector('.profile-card');
    if(this.showInfo) {
      card.classList.toggle('opened');
    } else {
      card.classList.toggle('closed');
    }
  }

  connectedCallback() {
    
    this.shadowRoot.querySelector('#fullName').innerText = this.getAttribute('name');
    this.shadowRoot.querySelector('#title').innerText = this.getAttribute('title');
    this.shadowRoot.querySelector('#post').innerText = this.getAttribute('post');
    this.shadowRoot.querySelector('#likes').innerText = this.getAttribute('likes');
    this.shadowRoot.querySelector('#comments').innerText = this.getAttribute('comments');
    this.shadowRoot.querySelector('#main').style.backgroundImage = "url(" + this.getAttribute('avatar') + ")";

    this.shadowRoot.querySelector('#openerBtn').addEventListener('click', () => this.toggleInfo());

  }

  disconnectedCallback() {
    this.shadowRoot.querySelector('#openerBtn').removeEventListener();
  }

  setProp(prop, value, unit = '') {
    document.documentElement.style.setProperty(`--${prop}`, value + unit);
  }
}

window.customElements.define('profile-card', ProfileCard);
