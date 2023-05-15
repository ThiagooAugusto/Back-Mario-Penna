<script>
import appConfig from '@src/app.config'
import Layout from '@layouts/main'
import PageHeader from '@components/page-header'
import Multiselect from 'vue-multiselect'

export default {
    page: {
        title: 'Listar Residentes',
        meta: [{
            name: 'description',
            content: appConfig.description
        }],
    },
    components: {
        Layout,
        PageHeader,
        Multiselect
    },
    data() {
        return {
            title: 'Listar Residentes',
            residentes: [],
            residentesFiltrados: [],
            filtro: '',
            filtroPrograma: null,
            optionsPrograma:[
                'Mastologia',
                'Clinica Geral',
                'Oncologia'
            ]
        }
    },
    mounted() {

        if (localStorage.residentes) {
            this.residentes = JSON.parse(localStorage.residentes);
            this.residentesFiltrados = this.residentes

        }
    },
    methods: {
        buscar() {

            this.residentesFiltrados = this.residentes.filter((residente) => {
                return residente.tag.toLowerCase().includes(this.filtro.toLowerCase()) ||
                    residente.raca.toLowerCase().includes(this.filtro.toLowerCase()) ||
                    residente.sexo.toLowerCase().includes(this.filtro.toLowerCase())
            });

            if (this.tag == '') this.residentesFiltrados = this.residentes
        },

        editar(id) {
            this.$router.push({
                name: 'Cadastro de residente',
                query: {
                    parametros: {
                        id: id
                    }
                }
            })
        },

        visualizar(id) {
            console.log('Visualizar ', id)
        },

        deletar(id) {
            console.log('Deletou ', id)

            this.$swal.fire({
                position: 'center',
                title: 'Você tem certeza?',
                text: "Ao confirmar o residente será deletado",
                icon: 'warning',
                showCancelButton: true,
                //confirmButtonColor: '#3085d6',
                //cancelButtonColor: '#d33',
                confirmButtonText: 'Sim',
                cancelButtonText: 'Não',
            }).then((result) => {
                if (result.isConfirmed) {
                    //remove da tabela
                    this.residentesFiltrados = this.residentes.filter((residente) => {
                        return residente.id != id
                    });

                    //remove do localStorage
                    this.residentes = this.residentes.filter((residente) => {
                        return residente.id != id
                    });

                    localStorage.residentes = JSON.stringify(this.residentes);

                    this.$swal.fire({
                        position: 'top-end',
                        title: 'Deletado',
                        text: "residente deletado com sucesso.",
                        icon: 'success',
                        showConfirmButton: false,
                    })
                }
            })

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
                    <div class="row p-3">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="tag">
                                    Filtro
                                </label>
                                <input id="filtro" v-model="filtro" name="filtro" class="form-control" type="text"
                                    placeholder="Filtre pela Matrícula ou Nome" />
                            </div>
                        </div>

                        <div class="col-md-4 ">
                            <div class="form-group mt-3 mt-sm-0">
                                <label for="default">Programas</label>
                                <multiselect v-model="filtroPrograma" :options="optionsPrograma" :multiple="true"></multiselect>
                            </div>
                        </div>

                        <div class="col-md-2 mt-2">
                            <div class="form-group mt-3">
                                <button class="btn btn-warning" type="button" @click="buscar()">Buscar</button>
                            </div>
                        </div>
                        <div class="col-md-2 mt-2 justify-content-end">
                            <div class="form-group mt-3 float-right justify-content-end">
                                <button class="btn  btn-primary " type="button" @click="cadastrar()">Cadastrar</button>
                            </div>
                        </div>

                    </div>

                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-striped mb-0">
                                <thead>
                                    <tr>
                                        <th scope="col">Programa</th>
                                        <th scope="col">Nome</th>
                                        <th scope="col">Matrícula</th>
                                        <th scope="col" class="text-center">Opções</th>

                                    </tr>
                                </thead>

                                <tbody>
                                    <tr v-for="residente in residentesFiltrados">
                                        <th scope="row">{{ residente.programa }}</th>
                                        <td>{{ residente.nome }}</td>
                                        <td>{{ residente.matricula }}</td>
                                        <td class="text-center">
                                            <b-dropdown variant="light" size="sm">
                                                <template slot="button-content">
                                                    <feather type="menu"></feather>
                                                </template>
                                                <b-dropdown-item @click="editar(residente.id)">Editar</b-dropdown-item>
                                                <b-dropdown-item
                                                    @click="visualizar(residente.id)">Desenpenho</b-dropdown-item>
                                                <b-dropdown-item @click="deletar(residente.id)">Deletar</b-dropdown-item>
                                            </b-dropdown>
                                        </td>
                                    </tr>
                                    <tr v-show="residentesFiltrados.length == 0">
                                        <td colspan="6" class="text-center font-weight-bold">
                                            <h5>Nenhum Residente Encontrado</h5>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- end row -->
    </Layout>
</template>
