
//Importando knex
import { knex as knexConfig} from "knex"
import  config  from "../../knexfile"

//Exportando as configuraçoes do knex
export const knex = knexConfig(config)