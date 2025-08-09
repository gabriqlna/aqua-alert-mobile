import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:provider/provider.dart';
import '../providers/data_provider.dart';
import '../models/neighborhood_model.dart';

class MapScreen extends StatefulWidget {
  const MapScreen({super.key});

  @override
  State<MapScreen> createState() => _MapScreenState();
}

class _MapScreenState extends State<MapScreen> {
  GoogleMapController? _mapController;
  Set<Marker> _markers = {};
  Neighborhood? _selectedNeighborhood;

  // Nova Cruz, RN center coordinates
  static const LatLng _novaCruzCenter = LatLng(-5.6786, -35.4270);

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _updateMarkers();
    });
  }

  void _updateMarkers() {
    final provider = context.read<DataProvider>();
    final markers = <Marker>{};

    for (final neighborhood in provider.neighborhoods) {
      markers.add(
        Marker(
          markerId: MarkerId(neighborhood.id),
          position: neighborhood.coordinates,
          onTap: () => _onMarkerTapped(neighborhood),
          icon: _getMarkerIcon(neighborhood.status),
          infoWindow: InfoWindow(
            title: neighborhood.name,
            snippet: neighborhood.statusText,
          ),
        ),
      );
    }

    setState(() {
      _markers = markers;
    });
  }

  BitmapDescriptor _getMarkerIcon(WaterStatus status) {
    switch (status) {
      case WaterStatus.available:
        return BitmapDescriptor.defaultMarkerWithHue(BitmapDescriptor.hueGreen);
      case WaterStatus.unavailable:
        return BitmapDescriptor.defaultMarkerWithHue(BitmapDescriptor.hueRed);
      case WaterStatus.maintenance:
        return BitmapDescriptor.defaultMarkerWithHue(BitmapDescriptor.hueOrange);
    }
  }

  Color _getStatusColor(WaterStatus status) {
    switch (status) {
      case WaterStatus.available:
        return Colors.green;
      case WaterStatus.unavailable:
        return Colors.red;
      case WaterStatus.maintenance:
        return Colors.orange;
    }
  }

  void _onMarkerTapped(Neighborhood neighborhood) {
    setState(() {
      _selectedNeighborhood = neighborhood;
    });
    
    _showNeighborhoodBottomSheet(neighborhood);
  }

  void _showNeighborhoodBottomSheet(Neighborhood neighborhood) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) => DraggableScrollableSheet(
        initialChildSize: 0.4,
        maxChildSize: 0.8,
        minChildSize: 0.3,
        builder: (context, scrollController) => Container(
          padding: const EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Handle bar
              Center(
                child: Container(
                  width: 40,
                  height: 4,
                  decoration: BoxDecoration(
                    color: Colors.grey[300],
                    borderRadius: BorderRadius.circular(2),
                  ),
                ),
              ),
              const SizedBox(height: 20),

              // Neighborhood info
              Row(
                children: [
                  Icon(
                    Icons.location_on,
                    color: _getStatusColor(neighborhood.status),
                    size: 32,
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          neighborhood.name,
                          style: Theme.of(context).textTheme.titleLarge?.copyWith(
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        Text(
                          neighborhood.statusText,
                          style: TextStyle(
                            color: _getStatusColor(neighborhood.status),
                            fontWeight: FontWeight.w500,
                            fontSize: 16,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),

              const SizedBox(height: 20),

              // Details
              _buildDetailRow(
                icon: Icons.sensors,
                label: 'Sensor ID',
                value: neighborhood.sensorId,
              ),
              _buildDetailRow(
                icon: Icons.people,
                label: 'População',
                value: '~${neighborhood.population.toString().replaceAllMapped(
                  RegExp(r'(\d{1,3})(?=(\d{3})+(?!\d))'), 
                  (Match m) => '${m[1]}.'
                )} habitantes',
              ),
              if (neighborhood.updatedAt != null)
                _buildDetailRow(
                  icon: Icons.schedule,
                  label: 'Última atualização',
                  value: _formatDateTime(neighborhood.updatedAt!),
                ),

              const SizedBox(height: 20),

              // Actions
              SizedBox(
                width: double.infinity,
                child: ElevatedButton.icon(
                  onPressed: () {
                    Navigator.pop(context);
                    // Navigate to report screen with this neighborhood pre-selected
                    // This would need to be implemented in the main app
                  },
                  icon: const Icon(Icons.report_problem),
                  label: const Text('Relatar problema'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.red,
                    foregroundColor: Colors.white,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildDetailRow({
    required IconData icon,
    required String label,
    required String value,
  }) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Row(
        children: [
          Icon(icon, size: 20, color: Colors.grey[600]),
          const SizedBox(width: 12),
          Text(
            '$label: ',
            style: const TextStyle(
              fontWeight: FontWeight.w500,
              color: Colors.grey,
            ),
          ),
          Expanded(
            child: Text(
              value,
              style: const TextStyle(fontWeight: FontWeight.w500),
            ),
          ),
        ],
      ),
    );
  }

  String _formatDateTime(DateTime dateTime) {
    final now = DateTime.now();
    final difference = now.difference(dateTime);

    if (difference.inMinutes < 1) return 'agora';
    if (difference.inMinutes < 60) return '${difference.inMinutes} min atrás';
    if (difference.inHours < 24) return '${difference.inHours} h atrás';
    
    return '${dateTime.day}/${dateTime.month}/${dateTime.year}';
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<DataProvider>(
      builder: (context, provider, child) {
        // Update markers when data changes
        WidgetsBinding.instance.addPostFrameCallback((_) {
          _updateMarkers();
        });

        return Scaffold(
          body: Stack(
            children: [
              // Google Map
              GoogleMap(
                onMapCreated: (GoogleMapController controller) {
                  _mapController = controller;
                },
                initialCameraPosition: const CameraPosition(
                  target: _novaCruzCenter,
                  zoom: 13,
                ),
                markers: _markers,
                myLocationEnabled: true,
                myLocationButtonEnabled: true,
                mapType: MapType.normal,
                zoomControlsEnabled: false,
              ),

              // Map legend
              Positioned(
                bottom: 100,
                left: 16,
                child: Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(8),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withOpacity(0.1),
                        blurRadius: 4,
                        offset: const Offset(0, 2),
                      ),
                    ],
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        'Legenda',
                        style: Theme.of(context).textTheme.titleSmall?.copyWith(
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(height: 8),
                      _buildLegendItem(Colors.green, 'Água disponível'),
                      _buildLegendItem(Colors.red, 'Sem água'),
                      _buildLegendItem(Colors.orange, 'Manutenção'),
                    ],
                  ),
                ),
              ),

              // Refresh button
              Positioned(
                top: 50,
                right: 16,
                child: FloatingActionButton(
                  mini: true,
                  onPressed: provider.loadData,
                  child: provider.isLoading 
                      ? const SizedBox(
                          width: 20,
                          height: 20,
                          child: CircularProgressIndicator(strokeWidth: 2),
                        )
                      : const Icon(Icons.refresh),
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildLegendItem(Color color, String label) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 4),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: 12,
            height: 12,
            decoration: BoxDecoration(
              color: color,
              shape: BoxShape.circle,
            ),
          ),
          const SizedBox(width: 6),
          Text(
            label,
            style: const TextStyle(fontSize: 12),
          ),
        ],
      ),
    );
  }
}