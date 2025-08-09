import 'package:flutter/foundation.dart';
import '../models/neighborhood_model.dart';
import '../services/api_service.dart';

class DataProvider with ChangeNotifier {
  List<Neighborhood> _neighborhoods = [];
  List<Alert> _alerts = [];
  bool _isLoading = false;
  String? _error;

  List<Neighborhood> get neighborhoods => _neighborhoods;
  List<Alert> get alerts => _alerts;
  bool get isLoading => _isLoading;
  String? get error => _error;

  WaterStatus get overallStatus {
    if (_neighborhoods.any((n) => n.status == WaterStatus.unavailable)) {
      return WaterStatus.unavailable;
    }
    if (_neighborhoods.any((n) => n.status == WaterStatus.maintenance)) {
      return WaterStatus.maintenance;
    }
    return WaterStatus.available;
  }

  Future<void> loadData() async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final neighborhoods = await ApiService.getNeighborhoods();
      final alerts = await ApiService.getAlerts();
      
      _neighborhoods = neighborhoods;
      _alerts = alerts;
      _error = null;
    } catch (e) {
      _error = e.toString();
      debugPrint('Error loading data: $e');
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> submitReport(Report report) async {
    try {
      await ApiService.createReport(report);
      // Reload data to get updated alerts
      await loadData();
    } catch (e) {
      _error = e.toString();
      notifyListeners();
      rethrow;
    }
  }

  Future<void> updateNeighborhoodStatus(String id, WaterStatus status) async {
    try {
      await ApiService.updateNeighborhoodStatus(id, status);
      // Reload data to get updated status and alerts
      await loadData();
    } catch (e) {
      _error = e.toString();
      notifyListeners();
      rethrow;
    }
  }

  Neighborhood? getNeighborhoodById(String id) {
    try {
      return _neighborhoods.firstWhere((n) => n.id == id);
    } catch (e) {
      return null;
    }
  }

  void clearError() {
    _error = null;
    notifyListeners();
  }
}