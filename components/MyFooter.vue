
<template>
  <v-footer dark height="auto" style="background-color: #22327a">
    <v-layout row wrap>
      <v-flex xs12 sm5 hidden-sm-and-down offset-xs1>
        <div class="pt-5 pb-5">
          <h2 style="color: #fff; text-transform: uppercase;" class="pb-2">ICJIA Associate Sites</h2>
          <div class="text-xs-left footerLink">
            <a href="http://www.icjia.org/redeploy/">Adult Redeploy Illinois</a>
          </div>
          <div class="text-xs-left footerLink">
            <a
              href="http://www.icjia.state.il.us/ifvcc"
            >Illinois Family Violence Coordinating Councils</a>
          </div>
          <div class="text-xs-left footerLink">
            <a href="https://ilheals.com/">Illinois HEALS</a>
          </div>
          <div class="text-xs-left footerLink">
            <a href="https://illinoistvpp.org/">Targeted Violence Prevention Program</a>
          </div>
        </div>
      </v-flex>
      <v-flex xs12 sm5 offset-xs1>
        <div class="pt-5 pb-5">
          <div class="text-xs-center">
            <h2
              style="color: #fff; text-transform: uppercase;"
              class="pb-2"
            >Sign Up For the CJ Dispatch</h2>

            <v-btn
              class="dispatch"
              color="indigo darken-1"
              href="https://visitor.r20.constantcontact.com/manage/optin?v=001MqUcqqvjwLCJXlLMSWbTe3zHHmEQgFeBuHvBcJWTbwgrxFbDSGx4HSUPpI6DJWMUPgbljtLxffqIcGFTgCnr-auak88ybvRxpoJlTMGPtZs%3D"
            >Subscribe Now</v-btn>
            <div class="tiny pt-3 footerLink">
              (312) 793-8550 - Fax: (312) 793-8422 -
              <a
                href="mailto: cja.irc@illinois.gov"
              >cja.irc@illinois.gov</a>
            </div>

            <div class="tiny pt-2 footerLink">
              <a
                href="http://www.icjia.state.il.us"
              >© 2019 Illinois Criminal Justice Information Authority</a>
            </div>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </v-footer>
</template>

<script>
import { blob } from '@/mixins/blob'
export default {
  mixins: [blob],
  data() {
    return {}
  },
  methods: {
    gotoDispatch() {
      window.location =
        'https://visitor.r20.constantcontact.com/manage/optin?v=001MqUcqqvjwLCJXlLMSWbTe3zHHmEQgFeBuHvBcJWTbwgrxFbDSGx4HSUPpI6DJWMUPgbljtLxffqIcGFTgCnr-auak88ybvRxpoJlTMGPtZs%3D'
    }
  }
}
</script>

<style>
.footer {
  font-size: 14px;
}

.tiny {
  font-size: 12px;
}

.footerLink a {
  color: #5c6bc0 !important;
}

.footerLink a:hover {
  color: #777 !important;
}

.dispatch .v-btn__content {
  color: #fff !important;
}
</style>