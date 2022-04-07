// noinspection JSPotentiallyInvalidConstructorUsage
window.onload = init;

function init() {

//Basic view for overviewmap and for the real map
    const basicView = new ol.View({
        //projection: 'EPSG:4326',
        center: ol.proj.fromLonLat([0, 20]),
        zoom: 3,
        maxZoom: 15,
        minZoom: 1,
    });


const overview = new ol.control.OverviewMap({
    className: 'ol-overviewmap ol-custom-overviewmap',
    layers: [new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=NK58mNS9G9jjwD52ecI1'
        }),
        title: 'mapTiler',
        visible: true,
    }),
    ],
    collapseLabel: '\u2228',
    label: '\u2227',
    collapsed: true,
})

//MAP LAYER
const map = new ol.Map({
    controls: ol.control.defaults().extend([
        new ol.control.FullScreen(),
        new ol.control.ScaleLine({
            units: 'metric',
        }),
        new ol.control.ZoomSlider(),
        overview,
    ]),
    view: basicView,
    target: 'js-map'
});

//DIFFERENT TILES
    const esriWorldImagery = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
        }),
        visible: true,
        title: 'esriWorldImagery'
    })


    const usgsUsImagery = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}',
        }),
        visible: false,
        title: 'usgsUsImagery'
    })

    const usgsUsImageryTopo = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryTopo/MapServer/tile/{z}/{y}/{x}',
        }),
        visible: false,
        title: 'usgsUsImageryTopo'
    })

    const esriWorldTerrain = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}',
        }),
        visible: false,
        title: 'esriWorldTerrain'
    })

    const esriWorldGrayCanvas = new ol.layer.Tile({
        source: new ol.source.XYZ({
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
        }),
        visible: false,
        title: 'esriWorldGrayCanvas'
    })


//Possible to add layers one by one
//map.addLayer(stamenTerrain)
//Also possible to create a LayerGroup
    const baseLayerGroup = new ol.layer.Group({
        layers:
            [esriWorldImagery, usgsUsImagery, usgsUsImageryTopo, esriWorldTerrain, esriWorldGrayCanvas]
    })

//Just choose which one to show with visible attribute
    map.addLayer(baseLayerGroup);



}

