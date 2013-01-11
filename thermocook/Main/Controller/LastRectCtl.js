Ext.define('thermocook.Main.Controller.LastRectControll', {
    extend : 'Ext.app.Controller',
    models : ['thermocook.Main.Model.LastRectModel'],
    stores : ['thermocook.Main.Store.LastRectStore'],
    views : ['thermocook.Main.View.LastRectGrid'],
    init : function() {
        this.control({
            'lastRectGrid' : {
                render : function(c) {
                    c.store.load();
                },
                itemclick : function(grid, record) {
                    
                }
            }
        });
    }
});
