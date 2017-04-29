import widgets from 'jupyter-js-widgets'

export const FigureModel = widgets.VBoxModel.extend({
  defaults: {
    ...widgets.DOMWidgetModel.prototype.defaults,
    _model_name: "FigureModel",
    _view_name: "FigureView",
    _model_module: "jupyter-gmaps",
    _view_module: "jupyter-gmaps",
    children: [],
    box_style: '',
    _map: undefined,
    _toolbar: undefined
  }

}, {
    serializers: _.extend({
            children: {deserialize: widgets.unpack_models},
            _map: {deserialize: widgets.unpack_models},
            _toolbar: {deserialize: widgets.unpack_models},
    }, widgets.DOMWidgetModel.serializers)
})

export const FigureView = widgets.VBoxView.extend({
    initialize(parameters) {
      FigureView.__super__.initialize.apply(this, arguments)
      this.mapView = this.add_child_model(this.model.get("_map"));
      this.toolbarView =
        this.add_child_model(this.model.get("_toolbar"))
            .then(toolbarView => {
                toolbarView.registerSavePngCallback(() => this.savePng())
                return toolbarView;
            })
    },

    savePng() {
        return this.mapView.then(view => view.savePng());
    }
})
