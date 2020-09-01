<template>
	<div class="contact" :id="sections.CONTACT">
		<div class="app__container">
			<h2 class="app__heading">
				Contact
			</h2>
			<div class="contact__container">
				<div class="contact__info">
					<h3>Email and Social Media</h3>
					<div class="contact__wrap">
						<div class="contact__media">
							<a class="contact__link" 
								href="mailto:contact@kgjoner.com"
								title="email">
									<i class="fa fa-envelope"></i>
							</a>
							<p v-show="windowWidth > 780">contact@kgjoner.com</p>
						</div>
						<div class="contact__media">
							<a class="contact__link git" 
								href="https://github.com/kgjoner" 
								target="_blank"
								rel="noopener"
								title="Github">
									<i class="fa fa-github"></i>
							</a>
							<p v-show="windowWidth > 780">/kgjoner</p>
						</div>
						<div class="contact__media">
							<a class="contact__link in"
								href="https://www.linkedin.com/in/kaio-gabriel-da-silveira-rosa-63938011a/" 
								target="_blank"
								rel="noopener"  
								title="Linkedin">
									<i class="fa fa-linkedin"></i>
							</a>
							<p v-show="windowWidth > 780">kaio gabriel</p>
						</div>
					</div>
					<div v-show="windowWidth <= 780"
						class="contact__media">
						<p>contact@kgjoner.com</p>
					</div>
				</div>

				<b-form class="contact__form" name="Contact" 
					@submit.prevent="handleSubmit" method="post" 
					data-netlify="true" data-netlify-honeypot="bot-field">
					<input type="hidden" name="form-name" value="Contact" />

					<h3>Let a message!</h3>
					<b-col md="12" sm="12">
						<b-form-group label-for="contact-name">
								<label for="contact-name" 
									class="contact__label">
									Name
								</label>
								<b-form-input id="contact-name"
									class="contact__input" 
									name="name" type="text" 
									placeholder="Name" 
									v-model="form.name" 
									required />
						</b-form-group>
						<b-form-group label-for="contact-email">
								<label for="contact-email" 
									class="contact__label">
									Email	
								</label>
								<b-form-input id="contact-email"
									class="contact__input" 
									name="email" type="text" 
									placeholder="Email"
									v-model="form.email" 
									required />
						</b-form-group>
					</b-col>

					<b-col md="12" sm="12">
						<b-form-group label-for="contact-content">
							<label for="contact-content" 
								class="contact__label">
								Message
							</label>
							<b-form-textarea id="contact-content"
								class="contact__input"  
								name="text" rows="4" max-rows="4" 
								v-model="form.text" 
								placeholder="Message"/>
						</b-form-group>
					</b-col>

					<b-col class="send">
						<b-button type="submit" variant="primary">Send</b-button>
					</b-col>
				</b-form>
			</div>

		</div>
	</div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import { sections } from '../../constants'

export default {
	name: "Contact",
	data: function() {
		return {
			form: {
				name: '',
				email: '',
				text: ''
			},
			sections
		}
	},
	computed: {
		...mapState({
			windowWidth: state => state.windowWidth
		})
	},
	methods: {
		encode (data) {
			return Object.keys(data)
				.map(
					key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
				)
				.join("&");
		},

		handleSubmit () {
			this.form.text = this.form.text + ' /from .dev subdomain.'
			const axiosConfig = {
				header: { "Content-Type": "application/x-www-form-urlencoded" }
			};
			axios.post("/", this.encode({
				"form-name": "Contact",
				...this.form,
				}),
				axiosConfig
			)
			.then(() => this.$toasted.success('Message sent!', { icon: 'check' }))
			.then(() => this.form = {name: '', email: '', text: ''})
		}
	}
}
</script>

<style>
.contact {
	padding: 80px 0;
	min-height: calc(100vh - 40px);
  background: linear-gradient(to bottom, #c9c9c9, #fff);
}

.contact__container {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;

	padding: 40px;
	width: 100%;
	overflow: hidden;
	background-color: rgba(62, 65, 66, 0.8);
	color: #fcfcfc;
	position: relative;
	border-radius: 5px;
}

.contact h3 {
	margin-bottom: 20px;
	padding-left: 10px;
	font-family: "Baloo 2";
	font-size: 1.6rem;
	text-align: left;
}

.contact__info {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	width: 50%;
	padding-right: 50px;
	position: relative;
	top: 0;
}

.contact__info p {
	font-size: 1.1rem;
	margin-left: 10px;
	margin-bottom: 0;
	font-family: 'Baloo 2';
	letter-spacing: 0.2px;
}

.contact__media {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	margin-bottom: 15px;
}

.contact__link {
	height: 2.25rem;
	width: 2.25rem;
	background-color: #fafafa;
	border-radius: 0.25rem;
	margin-left: 10px;

	color: var(--dark-color);
	text-decoration: none;
	font-size: 1.3rem;

	display: flex;
	align-items: center;
	justify-content: center;
}

.contact__link:hover {
	background-color: var(--main-color);
	text-decoration: none;
	color: #fafafa;
}

.contact__link.git:hover {
	background-color: #24292E
}

.contact__link.in:hover {
	background-color: #0077B5;
}

.contact__link.wt:hover {
	background-color: rgba(255,102,18)
}

.contact__form {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	width: 50%;
	text-align: left;
}

.contact__label {
	position: absolute;
	width: 1px;
	height: 1px;
	opacity: 0;
}

.contact__input:focus {
	/* border-color:#19a5d8; */
	border-color: rgba(var(--main-rgb), 0.4);
	box-shadow: 0 0 2px 2px var(--main-color);
}

.send button {
	width: 50%;
	height: 60px;
	float:right;
	text-transform: uppercase;
	font-weight: bold;
	letter-spacing: 0.4px;
	background-color: var(--main-color);
	/* background-color: #1492c0; */
	/* border-color: #1492c0; */
	border: none;
}

.send button:hover {
	background-color: rgba(var(--main-rgb), 0.75);
	/* background-color: #0f81aa; */
	/* border-color: #0b749b; */
}

.send button:focus {
	background-color: rgba(var(--main-rgb), 0.75);
	box-shadow: 0 0 0px 3px var(--main-color);
}

.contact .fa-github {
	font-size: 1.5rem;
}

@media(max-width: 780px) {
	.contact {
		padding: 80px 10px;
	}

	.contact__container {
		flex-direction: column;
		padding: 40px 20px;
	}

	.contact__info {
		width: 100%;
		padding-right: 0;
		margin-bottom: 30px;
	}

	.contact__wrap {
		display: flex;
	}

	.contact__form {
		width: 100%;
	}
}

@media(max-width: 500px) {
	.contact__container {
		padding: 40px 10px;
	}
}
</style>
