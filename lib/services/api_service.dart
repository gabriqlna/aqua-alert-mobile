import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:google_maps_flutter/google_maps_flutter.dart';
import '../models/neighborhood_model.dart';

class ApiService {
  static const String _baseUrl = 'http://localhost:5000/api'; // For development
  // static const String _baseUrl = 'https://your-replit-domain.replit.app/api'; // For production
  
  // Nova Cruz neighborhoods with real coordinates
  static const Map<String, Map<String, double>> _neighborhoodCoordinates = {
    'Centro': {'lat': -5.6786, 'lng': -35.4270},
    'Bairro Norte': {'lat': -5.6750, 'lng': -35.4250},
    'Bairro Sul': {'lat': -5.6820, 'lng': -35.4290},
    'Zona Rural': {'lat': -5.6850, 'lng': -35.4200},
  };

  static Future<List<Neighborhood>> getNeighborhoods() async {
    try {
      final response = await http.get(Uri.parse('$_baseUrl/neighborhoods'));
      
      if (response.statusCode == 200) {
        final List<dynamic> data = json.decode(response.body);
        return data.map((json) {
          final coords = _neighborhoodCoordinates[json['name']] ?? 
                        {'lat': -5.6786, 'lng': -35.4270};
          return Neighborhood.fromJson(json, 
            LatLng(coords['lat']!, coords['lng']!));
        }).toList();
      } else {
        throw Exception('Failed to load neighborhoods');
      }
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }

  static Future<List<Alert>> getAlerts() async {
    try {
      final response = await http.get(Uri.parse('$_baseUrl/alerts'));
      
      if (response.statusCode == 200) {
        final List<dynamic> data = json.decode(response.body);
        return data.map((json) => Alert.fromJson(json)).toList();
      } else {
        throw Exception('Failed to load alerts');
      }
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }

  static Future<Report> createReport(Report report) async {
    try {
      final response = await http.post(
        Uri.parse('$_baseUrl/reports'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode(report.toJson()),
      );
      
      if (response.statusCode == 201) {
        return Report.fromJson(json.decode(response.body));
      } else {
        throw Exception('Failed to create report');
      }
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }

  static Future<Neighborhood> updateNeighborhoodStatus(
      String id, WaterStatus status) async {
    try {
      final response = await http.patch(
        Uri.parse('$_baseUrl/neighborhoods/$id/status'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({'status': _statusToString(status)}),
      );
      
      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        final coords = _neighborhoodCoordinates[data['name']] ?? 
                      {'lat': -5.6786, 'lng': -35.4270};
        return Neighborhood.fromJson(data, 
          LatLng(coords['lat']!, coords['lng']!));
      } else {
        throw Exception('Failed to update status');
      }
    } catch (e) {
      throw Exception('Network error: $e');
    }
  }

  static String _statusToString(WaterStatus status) {
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