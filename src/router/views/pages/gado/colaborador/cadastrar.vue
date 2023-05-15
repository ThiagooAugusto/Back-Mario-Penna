<script>
import appConfig from '@src/app.config'
import Layout from '@layouts/main'
import PageHeader from '@components/page-header'
//import router from '@/router'

import {
    required,
    email,
    minLength,
    sameAs,
    maxLength,
    minValue,
    maxValue,
    numeric,
    url,
    alphaNum,
} from 'vuelidate/lib/validators'

export default {
    page: {
        title: 'Cadastro de Colaborador',
        meta: [{
            name: 'description',
            content: appConfig.description
        }],
    },
    components: {
        Layout,
        PageHeader
    },
    data() {
        return {
            title: 'Cadastro de Colaborador',
            
        }
    },
    mounted() {

       
    },
    validations: {
        

    },
    methods: {

        buscarPorId() {
           
        },

        preencherForm(animal) {
           
        },

        generateUUID() { // Public Domain/MIT
            var d = new Date().getTime(); //Timestamp
            var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0; //Time in microseconds since page-load or 0 if unsupported
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16; //random number between 0 and 16
                if (d > 0) { //Use timestamp until depleted
                    r = (d + r) % 16 | 0;
                    d = Math.floor(d / 16);
                } else { //Use microseconds since page-load if supported
                    r = (d2 + r) % 16 | 0;
                    d2 = Math.floor(d2 / 16);
                }
                return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
        },
        handleSubmit(e) {
            

        },

        

        validateFields() {

           
        }

    },
}
</script>

<template>
<Layout>
    <PageHeader :title="title" />
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">

                    <p class="sub-header font-weight-bold">Os campos com (<span class="text-danger">*</span>) são obrigatórios</p>
                    <form @submit.prevent="handleSubmit">
                        

                        

                        <div class="form-group text-right m-b-0">
                            <button class="btn btn-primary" type="submit">Salvar</button>
                        </div>
                    </form>
                </div>
            </div>
            <!-- end card--->
        </div>
        <!-- end col -->
    </div>
    <!-- end row -->

</Layout>
</template>
