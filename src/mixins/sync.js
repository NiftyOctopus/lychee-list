import { load } from './load'

export const sync = {
    data() { return {
        
    }},
    mixins: [load],
    methods: {
        async syncWithCloud() {
            this.$store.commit('update', ['syncing', true])

            // Get last sync timestamp
            const synced = localStorage.getItem('synced')
            const last   = synced ? synced : ''
            const now    = new Date()

            // Get records updated since last sync
            const items   = await this.$db.items.where('updated').above(last).toArray()
            const recipes = await this.$db.recipes.where('updated').above(last).toArray()
            
            const url  = process.env.VUE_APP_API + 'sync'
            const data = { last, items, recipes }

            const res = await this.$http.post(url, data, { withCredentials: true })

            if(res.data.error) {
                this.$store.commit('update', ['syncing', false])

                if(localStorage.getItem('email')) {
                    this.$store.dispatch('message', { text: res.data.error })
                }
                return
            }
            this.$store.dispatch('message', { text: 'Sync complete' })
            
            try {
                await this.deleteAfterSync(res.data)
                await this.updateAfterSync(res.data)

                this.$store.dispatch('message', { text: 'Updated local data' })

                // Only update the last sync timestamp if request succeeds
                localStorage.setItem('synced', now.toISOString())
                this.$store.commit('update', ['lastSync', now])
                this.$store.commit('update', ['syncing',  false])
                this.load()

            } catch(e) {
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
            let records

            for(let table of ['items', 'recipes']) {
                records = data[table].cloud.updated
                
                for(let record of records) {
                    await this.$db[table].put(record)
                }
            }
        }
    }
}