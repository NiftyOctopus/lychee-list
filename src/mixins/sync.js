import { load } from './load'

export const sync = {
    data() { return {
        
    }},
    mixins: [load],
    methods: {
        async syncWithCloud() {
            this.$store.commit('update', ['syncing', true])
            this.$store.commit('log', 'Starting sync')

            // Get last sync timestamp
            const synced = localStorage.getItem('synced')
            const last   = synced ? synced : ''
            const now    = new Date()

            // Get records updated since last sync
            this.$store.commit('log', 'Getting records from local db')
            const items   = await this.$db.items.where('updated').above(last).toArray()
            const recipes = await this.$db.recipes.where('updated').above(last).toArray()
            
            const url  = process.env.VUE_APP_API + 'sync'
            const data = { last, items, recipes }

            this.$store.commit('log', 'Sending request to cloud')
            try {
                const res = await this.$http.post(url, data, { withCredentials: true })
            } catch(e) {
                this.$store.commit('log', e)
                this.$store.commit('update', ['syncing', false])
                return
            }
            this.$store.commit('log', 'Got response from cloud')

            if(res.data.error) {
                this.$store.commit('update', ['syncing', false])

                if(localStorage.getItem('email')) {
                    this.$store.dispatch('message', { text: res.data.error })
                }
                return
            }
            
            try {
                this.$store.commit('log', 'Deleting records')
                await this.deleteAfterSync(res.data)
                this.$store.commit('log', 'Updating records')
                const resync = await this.updateAfterSync(res.data)

                // Only update the last sync timestamp if request succeeds
                localStorage.setItem('synced', now.toISOString())
                this.$store.commit('update', ['lastSync', now])
                this.$store.commit('update', ['syncing',  false])

                this.$store.commit('log', 'Sync complete')
                this.load()
                this.$store.commit('log', 'Data reloaded')
                if(resync) this.syncWithCloud()

            } catch(e) {
                this.$store.commit('update', ['syncing',  false])
                alert(e)
            }

            // What if only some of the records failed to sync?
            // We want those records to try syncing next time...
            // Change the updated timestamp of just those records to slightly after the failed attempt. Noice.
        },
        async deleteAfterSync(data) {
            let local, cloud

            for(let table of ['items', 'recipes']) {
                local = data[table].deleted
                cloud = data[table].cloud.deleted
                await this.$db[table].bulkDelete([...local, ...cloud])
            }
        },
        async updateAfterSync(data) {
            let records, resync

            for(let table of ['items', 'recipes']) {
                records = data[table].cloud.updated
                
                for(let record of records) {
                    try { await this.$db[table].put(record) }
                    catch(e) {
                        if(e.name === 'ConstraintError') {
                            record.name    = record.name + '*'
                            record.updated = new Date().toISOString()
                            await this.$db[table].put(record)
                            resync = true

                        } else { throw e }
                    }
                }
            }
            return resync
        }
    }
}