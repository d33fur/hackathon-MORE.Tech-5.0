from math import sin, cos, sqrt, atan2, radians


class DistanceSorter():
    def __init__(self, lat, lon):
        self.lat = lat
        self.lon = lon

    def __call__(self, obj):
        return self.get_distance(self.lon, self.lat, obj.longitude, obj.latitude)

    def get_distance(lon1, lat1, lon2, lat2):
        R = 6373

        lon1 = radians(lon1)
        lat1 = radians(lat1)
        lon2 = radians(lon2)
        lat2 = radians(lat2)

        dlon = lon2 - lon1
        dlat = lat2 - lat1

        a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
        return R * 2 * atan2(sqrt(a), sqrt(1 - a))