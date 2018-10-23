<template>

    <div>

        <v-card raised>

            <v-card-title class="primary-title-bg">
                <div class="title-flex">
                    <div>

                        <h3>About the IFVCC</h3>
                    </div>

                </div>

            </v-card-title>



            <div class="card-text">
                <p>Family Violence Coordinating Councils, at both the state and local/circuit levels, provide a forum to improve
                    the institutional, professional and community response to family violence including child abuse, domestic
                    abuse, and elder abuse. Councils provide professional education and prevention; coordinate interventions
                    and services for victims and perpetrators; and contribute to both the improvement of the legal system
                    and the administration of justice.</p>
                <p> Initiated under the auspices of the Illinois Supreme Court in 1990, Illinois is one of the few states that
                    has a systematically organized, statewide infrastructure that operates at both the state and local levels.
                    Since the 1970’s, a comprehensive, coordinated approach to preventing family violence has been promoted
                    as the most efficient and effective way to penetrate systems and mobilize them for the greatest change.
                </p>
                <p>Annually, up to 15,000 professionals from across Illinois participate in trainings and council projects.
                    These include family violence training and education of criminal justice and community professionals;
                    development of criminal justice procedures, protocols, and services related to family violence; and the
                    facilitation of coordinated community response to family violence in local areas. These Local Councils
                    provide opportunities for communication between criminal justice professionals and community service
                    providers as well as encourage the sharing of information and resources, thereby providing for development
                    of a network of safety and assistance for family violence victims.
                </p>
                <p>Chief and circuit judges convene and chair the 23 local councils in all 102 counties in Illinois which are
                    composed of policy-level decision makers who represent agencies and services to help intervene and prevent
                    family violence.
                </p>
            </div>

        </v-card>

    </div>
</template>

<script>
    export default {
        name: 'AboutIFVCC'
    }
</script>

<style scoped>
    .card-text {
        padding: 30px 35px;
    }

    .card-text p:first-child:first-letter {
        color: purple;
        float: left;
        font-family: Georgia;
        font-size: 75px;
        line-height: 60px;
        padding-top: 4px;
        padding-right: 8px;
        padding-left: 3px;
    }
</style>