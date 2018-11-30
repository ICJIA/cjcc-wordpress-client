<template>
  <div class="page-height">
    <breadcrumb :key="$store.state.forceRender" title="Contact" showBreadcrumb></breadcrumb>

    <no-ssr>
      <v-container fill-height class="px-3 mt-5" id="page-content">
        <v-layout row wrap>
          <v-flex xs10 offset-xs1>
            <h1 class="mb-3 title-rule">{{title}}</h1>
          </v-flex>

          <v-flex xs10 offset-xs1 style="margin-top: 10px">
            <div v-html="blob('contact-intro')" class="dynamic-content" @click="handleClicks"></div>

            <div v-if="!isIE">
              <form style="margin-top: 0px">
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
                    <v-progress-circular indeterminate color="primary"></v-progress-circular>
                  </span>
                </div>

                <div
                  v-if="!showSubmit"
                  class="text-xs-center"
                  style="color: green"
                >{{successMessage}}</div>
                <div
                  v-if="showAxiosError"
                  style="color: red; font-size: 14px;"
                  class="mt-3 text-xs-center"
                >
                  <b style="font-size: 20px">ERROR: COMMENT NOT SENT</b>
                  <br>
                  <br>
                  {{axiosError}}
                </div>
              </form>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </no-ssr>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'

import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'
import DOMPurify from 'dompurify'
const config = require('@/config.json')

import { blob } from '@/mixins/blob'
import axios from 'axios'

export default {
  mixins: [validationMixin, blob],

  components: {
    Breadcrumb
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Contact the Illinois CJCC'
        }
      ],
      link: [
        {
          rel: 'canonical',
          href: this.permalink
        }
      ]
    }
  },
  mounted() {
    this.isIE = this.$browserDetect.isIE
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
      showLoader: false,
      id: '',
      successMessage: '',
      isIE: null
    }
  },
  computed: {
    title() {
      return 'Contact CJCC'
    },

    permalink() {
      return config.clientURL + 'contact'
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
        // sanitize comment, then strip html
        const cleanComment = DOMPurify.sanitize(this.comment).replace(
          /(<([^>]+)>)/gi,
          ''
        )

        this.comment = cleanComment

        let data = {
          name: this.name,
          email: this.email,
          comment: this.comment
        }
        const vm = this
        let obj = axios({
          method: 'post',
          url: 'https://mail.icjia.cloud/cjcc',
          data: data,
          config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
          .then(function(response) {
            //handle success
            //console.log(response.data)
            console.log('SUCCESS!', response.data.status, response.data.msg)
            vm.showSubmit = false
            vm.showAxiosError = false
            vm.showError = ''
            vm.successMessage = response.data.msg
            vm.showLoader = false
          })
          .catch(function(err) {
            //handle error
            //console.log(err)
            console.log('FAILED...', err)
            vm.showAxiosError = true
            vm.axiosError = err
            vm.showLoader = false
            vm.$forceUpdate()
          })
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