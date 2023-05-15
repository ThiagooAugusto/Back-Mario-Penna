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
        title: 'Cadastro de Animal',
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
            title: 'Cadastro de Animal',
            animais: [],

            optionsRaca: [
                'Angus',
                'Nelore',
                'Brahman',
                'Brangus',
                'Senepol',
                'Caracu',
                'Charolês'
            ],

            optionsFaseVida: [
                'Vitelo',
                'Novilho super precoce',
                'Novilho precoce',
                'Novilho',
                'Boi',
                'Touros',
            ],

            optionsDieta: [
                'Dieta padrão',
                'Dieta suplementar',
                'Dieta para filhotes'
            ],

            optionsSexo: [
                'Fêmea',
                'Macho'
            ],

            form: {
                id: '',
                tag: '',
                idade: '',
                peso: '',
                raca: '',
                sexo: '',
                dieta: '',
                faseVida: '',
            },
            submit: false,
            submitted: false,
            formsubmit: false,
            typesubmit: false,
        }
    },
    mounted() {

        if (localStorage.animais) {
            this.animais = JSON.parse(localStorage.animais);

        }

        if (this.$router.currentRoute.query.parametros && this.$router.currentRoute.query.parametros.id) {
            this.form.id = this.$router.currentRoute.query.parametros.id

            this.buscarPorId()
        }
    },
    validations: {
        form: {
            tag: {
                required,

            },
            idade: {
                required
            },
            peso: {
                required
            },
            raca: {
                required
            },
            sexo: {
                required
            },
            dieta: {
                required
            },
            faseVida: {
                required
            },
        },

    },
    methods: {

        buscarPorId() {
            const animalSelecionado = this.animais.filter((animal) => {
                return animal.id == this.form.id
            });
            this.preencherForm(animalSelecionado[0])
        },

        preencherForm(animal) {
            this.form.tag = animal.tag
            this.form.idade = animal.idade
            this.form.peso = animal.peso
            this.form.raca = animal.raca
            this.form.sexo = animal.sexo
            this.form.dieta = animal.dieta
            this.form.faseVida = animal.faseVida
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
            this.submitted = true

            // stop here if form is invalid
            this.$v.$touch()

            if (this.validateFields()) {
                console.log('entrou')
                if (this.form.id == '') {
                    //Cria uuid
                    this.form.id = this.generateUUID()

                    //Cria obj animal e adiciona ao arr
                    this.animais.push({
                        id: this.form.id,
                        tag: this.form.tag,
                        idade: this.form.idade,
                        peso: this.form.peso,
                        raca: this.form.raca,
                        sexo: this.form.sexo,
                        dieta: this.form.dieta,
                        faseVida: this.form.faseVida,
                    })

                    //Salva no localStorage como String(sempre transformar em string para salvar)
                    localStorage.animais = JSON.stringify(this.animais);

                    //Direciona para a ppágina de listagem
                    this.$router.push({
                        name: 'Listar Animal'
                    })

                    //Informa o usuario
                    this.$swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        //title: 'Sucesso',
                        text: 'Cadastro salvo com sucesso',
                        showConfirmButton: false,
                    })
                } else {
                    this.animais = this.animais.filter((animal) => {
                        return animal.id != this.form.id
                    });

                    this.animais.push({
                        id: this.form.id,
                        tag: this.form.tag,
                        idade: this.form.idade,
                        peso: this.form.peso,
                        raca: this.form.raca,
                        sexo: this.form.sexo,
                        dieta: this.form.dieta,
                        faseVida: this.form.faseVida,
                    })

                    //Salva no localStorage como String(sempre transformar em string para salvar)
                    localStorage.animais = JSON.stringify(this.animais);

                    //Direciona para a ppágina de listagem
                    this.$router.push({
                        name: 'Listar Animal'
                    })

                    //Informa o usuario
                    this.$swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        //title: 'Sucesso',
                        text: 'Cadastro atualizado com sucesso',
                        showConfirmButton: false,
                    })
                }
            }

        },

        atualizar() {
            console.log('ATT')

        },

        validateFields() {

            if (
                this.$v.form.tag.$error ||
                this.$v.form.idade.$error ||
                this.$v.form.peso.$error ||
                this.$v.form.raca.$error ||
                this.$v.form.sexo.$error ||
                this.$v.form.dieta.$error ||
                this.$v.form.faseVida.$error
            ) return false
            return true
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
                        <div class="row">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="tag">
                                        Tag
                                        <span class="text-danger">*</span>
                                    </label>
                                    <input id="tag" v-model="form.tag" name="tag" class="form-control" :class="{ 'is-invalid': submitted && $v.form.tag.$error }" type="text" placeholder="Insira o identificador do animal" />
                                    <div v-if="submitted && !$v.form.tag.required" class="invalid-feedback">O Campo é Obrigatório</div>
                                </div>
                            </div>

                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="idade">
                                        Idade (Meses)
                                        <span class="text-danger">*</span>
                                    </label>
                                    <input id="idade" v-model="form.idade" name="idade" class="form-control" :class="{ 'is-invalid': submitted && $v.form.idade.$error }" type="text" placeholder="Insira a idade do animal em meses" />
                                    <div v-if="submitted && !$v.form.idade.required" class="invalid-feedback">O Campo é Obrigatório</div>
                                </div>
                            </div>

                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="peso">
                                        Peso (Kg)
                                        <span class="text-danger">*</span>
                                    </label>
                                    <input id="peso" v-model="form.peso" name="peso" class="form-control" :class="{ 'is-invalid': submitted && $v.form.peso.$error }" type="text" placeholder="Insira o peso do animal em Kg" />
                                    <div v-if="submitted && !$v.form.peso.required" class="invalid-feedback">O Campo é Obrigatório</div>
                                </div>
                            </div>

                        </div>
                        <!--End Row-->

                        <div class="row">
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label for="raca">
                                        Raça
                                        <span class="text-danger">*</span>
                                    </label>
                                    <select v-model="form.raca" id="raca" name="raca" class="form-control custom-select" :class="{ 'is-invalid': submitted && $v.form.raca.$error }" type="text" placeholder="Escolha a raça do animal">
                                        <option v-for="raca in optionsRaca">{{raca}}</option>
                                    </select>
                                    <div v-if="submitted && !$v.form.raca.required" class="invalid-feedback">O Campo é Obrigatório</div>
                                </div>
                            </div>

                            <div class="col-md-3">
                                <div class="form-group">
                                    <label for="sexo">
                                        Sexo
                                        <span class="text-danger">*</span>
                                    </label>
                                    <select v-model="form.sexo" id="sexo" name="sexo" class="form-control custom-select" :class="{ 'is-invalid': submitted && $v.form.sexo.$error }" type="text" placeholder="Escolha o sexo do animal">
                                        <option v-for="sexo in optionsSexo">{{sexo}}</option>
                                    </select>
                                    <div v-if="submitted && !$v.form.sexo.required" class="invalid-feedback">O Campo é Obrigatório</div>
                                </div>
                            </div>

                            <div class="col-md-3">
                                <div class="form-group">
                                    <label for="faseVida">
                                        Fase Vida
                                        <span class="text-danger">*</span>
                                    </label>
                                    <select v-model="form.faseVida" id="faseVida" name="faseVida" class="form-control custom-select" :class="{ 'is-invalid': submitted && $v.form.faseVida.$error }" type="text" placeholder="Escolha a fase vida do animal">
                                        <option v-for="fase in optionsFaseVida">{{fase}}</option>
                                    </select>
                                    <div v-if="submitted && !$v.form.faseVida.required" class="invalid-feedback">O Campo é Obrigatório</div>
                                </div>
                            </div>

                            <div class="col-md-3">
                                <div class="form-group">
                                    <label for="dieta">
                                        Dieta
                                        <span class="text-danger">*</span>
                                    </label>
                                    <select v-model="form.dieta" id="dieta" name="dieta" class="form-control custom-select" :class="{ 'is-invalid': submitted && $v.form.dieta.$error }" type="text" placeholder="Escolha a dieta do animal">
                                        <option v-for="dieta in optionsDieta">{{dieta}}</option>
                                    </select>
                                    <div v-if="submitted && !$v.form.dieta.required" class="invalid-feedback">O Campo é Obrigatório</div>
                                </div>
                            </div>
                        </div>

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
