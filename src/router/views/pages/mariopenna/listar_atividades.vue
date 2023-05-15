<script>
import appConfig from '@src/app.config'
import Layout from '@layouts/main'
import PageHeader from '@components/page-header'
import Multiselect from 'vue-multiselect'

export default {
    page: {
        title: 'Listar atividade',
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
            title: 'Listar atividade',
            atividades: [],
            atividadesFiltrados: [
                {
                    id:'1',
                    descricao:'Congresso Brasileiro de Mastologia',
                    atividade:'Seminário',
                    multiplicador: '60'
                }
            ],
            filtro: '',
            filtroTipoAtividade:null,
            optionsTipoAtividade:[
                'Seminário',
                'Aula Online',
                'Atividade Prática'
            ]
        }
    },
    mounted() {

       
    },
    methods: {
        buscar() {

            this.atividadesFiltrados = this.atividades.filter((atividade) => {
                return atividade.tag.toLowerCase().includes(this.filtro.toLowerCase()) ||
                    atividade.raca.toLowerCase().includes(this.filtro.toLowerCase()) ||
                    atividade.sexo.toLowerCase().includes(this.filtro.toLowerCase())
            });

            if (this.tag == '') this.atividadesFiltrados = this.atividades
        },

        editar(id) {
            this.$router.push({
                name: 'Cadastro de atividade',
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
                text: "Ao confirmar o atividade será deletado",
                icon: 'warning',
                showCancelButton: true,
                //confirmButtonColor: '#3085d6',
                //cancelButtonColor: '#d33',
                confirmButtonText: 'Sim',
                cancelButtonText: 'Não',
            }).then((result) => {
                if (result.isConfirmed) {
                    //remove da tabela
                    this.atividadesFiltrados = this.atividades.filter((atividade) => {
                        return atividade.id != id
                    });

                    //remove do localStorage
                    this.atividades = this.atividades.filter((atividade) => {
                        return atividade.id != id
                    });

                    localStorage.atividades = JSON.stringify(this.atividades);

                    this.$swal.fire({
                        position: 'top-end',
                        title: 'Deletado',
                        text: "atividade deletado com sucesso.",
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
                            <input id="filtro" v-model="filtro" name="filtro" class="form-control" type="text" placeholder="Filtre pela Descrição" />
                        </div>
                    </div>
                    <div class="col-md-4 ">
                            <div class="form-group mt-3 mt-sm-0">
                                <label for="default">Tipo de Atividade</label>
                                <multiselect v-model="filtroTipoAtividade" :options="optionsTipoAtividade" :multiple="true"></multiselect>
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
                                    <th scope="col">Descrição</th>
                                    <th scope="col">Tipo de Atividade</th>
                                    <th scope="col">Multiplicador</th>
                                    <th scope="col" class="text-center">Opções</th>

                                </tr>
                            </thead>

                            <tbody>
                                <tr v-for="atividade in atividadesFiltrados">
                                    <th scope="row">{{atividade.descricao}}</th>
                                    <td>{{atividade.atividade}}</td>
                                    <td>{{atividade.multiplicador}}</td>
                                    <td class="text-center">
                                        <b-dropdown variant="light" size="sm">
                                            <template slot="button-content">
                                                <feather type="menu"></feather>
                                            </template>
                                            <b-dropdown-item @click="editar(atividade.id)">Editar</b-dropdown-item>
                                            <b-dropdown-item @click="deletar(atividade.id)">Deletar</b-dropdown-item>
                                        </b-dropdown>
                                    </td>
                                </tr>
                                <tr v-show="atividadesFiltrados.length == 0">
                                    <td colspan="6" class="text-center font-weight-bold">
                                        <h5>Nenhuma atividade Encontrada</h5>
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
