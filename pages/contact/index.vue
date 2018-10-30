<template>
    <div class="page-height">
        <breadcrumb 
       :key="$store.state.forceRender" 
       title="Contact" 
      
       showBreadcrumb></breadcrumb>


       <no-ssr>
        <v-container fill-height class="px-3"   id="page-content"  >
           
    <v-layout row wrap>
      
      <v-flex xs10 offset-xs1>

         <h1 class="text-xs-center box-head">Contact CJCC</h1>

        <div v-blob:contact-intro class="mt-3 mb-5"></div>
       
        <form>
    <v-text-field
      v-model="name"
      :error-messages="nameErrors"
      
      label="Name"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
      @click="clearAxiosError"
    ></v-text-field>
    <v-text-field
      v-model="email"
      :error-messages="emailErrors"
      label="E-mail"
      required
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
       @click="clearAxiosError"
    ></v-text-field>
   <v-textarea
        v-model="comment"
         :error-messages="commentErrors"
        auto-grow
        box
        required
        label="Comment"
        rows="10"
       class="mt-3"
        @click="clearAxiosError"
      ></v-textarea>
   
    <div v-if="showSubmit" class="text-xs-center">
    <v-btn @click="submit">submit</v-btn>
    <v-btn @click="clear">clear</v-btn>&nbsp;
    <span v-if="showLoader">
    <v-progress-circular
      indeterminate
      color="primary"
    ></v-progress-circular>
    </span>
    </div>
    
    <div v-if="!showSubmit" class="text-xs-center"> Your comment was successfully submitted</div>
    <div v-if="showAxiosError" style="color: red; font-size: 14px;" class="text-xs-center">
    {{axiosError.text}}
    </div>
  </form>
  
        
      </v-flex>
    </v-layout>
        </v-container>
         </no-ssr>
         
    </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import Spacer from '@/components/Spacer'
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'
import DOMPurify from 'dompurify'
import config from '@/config'
const emailjs = require('emailjs-com')

export default {
  mixins: [validationMixin],

  components: {
    Breadcrumb,
    Spacer
  },
  head() {
    return {
      title: this.title
    }
  },

  validations: {
    name: { required },
    email: { required, email },
    comment: { required }
  },
  data() {
    return {
      name: '',
      email: '',
      comment: '',
      showSubmit: true,
      showAxiosError: false,
      axiosError: '',
      showLoader: false
    }
  },
  computed: {
    title() {
      return 'Contact CJCC'
    },
    nameErrors() {
      const errors = []
      if (!this.$v.name.$dirty) return errors

      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
    commentErrors() {
      const errors = []
      if (!this.$v.comment.$dirty) return errors
      !this.$v.comment.required && errors.push('A comment is required')
      return errors
    },
    isSuccess(v) {
      return !this.$v.$invalid && this.$v.$dirty
    }
  },
  methods: {
    clearAxiosError() {
      return (this.showAxiosError = false)
    },
    submit() {
      this.$v.$touch()

      if (this.isSuccess) {
        this.showLoader = true
        // strip html, sanitize comment
        const cleanComment = DOMPurify.sanitize(this.comment).replace(
          /(<([^>]+)>)/gi,
          ''
        )

        this.comment = cleanComment

        const templateParams = {
          name: this.name,
          email: this.email,
          comment: this.comment
        }

        const vm = this

        emailjs
          .send(
            'mailgun',
            'template_ba2OUtYG_clone',
            templateParams,
            config.emailjsUserID
          )
          .then(
            function(response) {
              console.log('SUCCESS!', response.status, response.text)
              vm.showSubmit = false
              vm.showAxiosError = false
              vm.showError = ''
              vm.showLoader = false
            },
            function(error) {
              console.log('FAILED...', error)
              vm.showAxiosError = true
              vm.axiosError = error
              vm.showLoader = false
              vm.$forceUpdate()
            }
          )
      }
    },
    clear() {
      this.$v.$reset()
      this.name = ''
      this.email = ''
      this.comment = ''
      this.showAxiosError = false
      this.axiosError = ''
      this.showLoader = false
    }
  }
}
</script>

<style scoped>
</style>