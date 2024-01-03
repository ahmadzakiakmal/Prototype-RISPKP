import json

file_path = './Kepadatan_Komersial.json'
with open(file_path, 'r') as file:
    geojson_data = json.load(file)

heatmap_points = []

for feature in geojson_data['features']:
    geometry = feature['geometry']
    properties = feature['properties']

    gridcode = properties.get('gridcode', 0)

    intensity = gridcode

    if geometry['type'] == 'Polygon':
        for polygon in geometry['coordinates']:
            for point in polygon:
                heatmap_points.append({'lat': point[1], 'lng': point[0], 'intensity': intensity})

    elif geometry['type'] == 'MultiPolygon':
        for multipolygon in geometry['coordinates']:
            for polygon in multipolygon:
                for point in polygon:
                    heatmap_points.append({'lat': point[1], 'lng': point[0], 'intensity': intensity})

preview_points = heatmap_points
print(len(preview_points))

with open('Kepadatan_Komersial_Points.json', 'a') as file:
    file.write('[')
    for point in preview_points:
        # print(point)
        json.dump(point, file)
        file.write(',')
        file.write('\n')
    file.write(']')