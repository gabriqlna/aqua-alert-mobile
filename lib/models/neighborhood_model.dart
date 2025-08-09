import 'package:google_maps_flutter/google_maps_flutter.dart';

enum WaterStatus { available, unavailable, maintenance }

class Neighborhood {
  final String id;
  final String name;
  final WaterStatus status;
  final String sensorId;
  final int population;
  final LatLng coordinates;
  final DateTime? updatedAt;

  Neighborhood({
    required this.id,
    required this.name,
    required this.status,
    required this.sensorId,
    required this.population,
    required this.coordinates,
    this.updatedAt,
  });

  factory Neighborhood.fromJson(Map<String, dynamic> json, LatLng coordinates) {
    return Neighborhood(
      id: json['id'],
      name: json['name'],
      status: _statusFromString(json['status']),
      sensorId: json['sensorId'],
      population: json['population'],
      coordinates: coordinates,
      updatedAt: json['updatedAt'] != null 
          ? DateTime.parse(json['updatedAt']) 
          : null,
    );
  }

  static WaterStatus _statusFromString(String status) {
    switch (status) {
      case 'available':
        return WaterStatus.available;
      case 'unavailable':
        return WaterStatus.unavailable;
      case 'maintenance':
        return WaterStatus.maintenance;
      default:
        return WaterStatus.unavailable;
    }
  }

  String get statusText {
    switch (status) {
      case WaterStatus.available:
        return 'Água disponível';
      case WaterStatus.unavailable:
        return 'Sem água';
      case WaterStatus.maintenance:
        return 'Manutenção';
    }
  }

  static String getStatusText(WaterStatus status) {
    switch (status) {
      case WaterStatus.available:
        return 'Água disponível';
      case WaterStatus.unavailable:
        return 'Sem água';
      case WaterStatus.maintenance:
        return 'Manutenção';
    }
  }

  String get statusForApi {
    switch (status) {
      case WaterStatus.available:
        return 'available';
      case WaterStatus.unavailable:
        return 'unavailable';
      case WaterStatus.maintenance:
        return 'maintenance';
    }
  }
}

class Alert {
  final String id;
  final String message;
  final String type;
  final DateTime createdAt;

  Alert({
    required this.id,
    required this.message,
    required this.type,
    required this.createdAt,
  });

  factory Alert.fromJson(Map<String, dynamic> json) {
    return Alert(
      id: json['id'],
      message: json['message'],
      type: json['type'],
      createdAt: DateTime.parse(json['createdAt']),
    );
  }
}

class Report {
  final String id;
  final String neighborhoodId;
  final String problemType;
  final String description;
  final String? contactPhone;
  final DateTime createdAt;

  Report({
    required this.id,
    required this.neighborhoodId,
    required this.problemType,
    required this.description,
    this.contactPhone,
    required this.createdAt,
  });

  factory Report.fromJson(Map<String, dynamic> json) {
    return Report(
      id: json['id'],
      neighborhoodId: json['neighborhoodId'],
      problemType: json['problemType'],
      description: json['description'],
      contactPhone: json['contactPhone'],
      createdAt: DateTime.parse(json['createdAt']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'neighborhoodId': neighborhoodId,
      'problemType': problemType,
      'description': description,
      'contactPhone': contactPhone,
    };
  }
}