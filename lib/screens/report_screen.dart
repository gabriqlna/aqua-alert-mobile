import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/data_provider.dart';
import '../models/neighborhood_model.dart';

class ReportScreen extends StatefulWidget {
  const ReportScreen({super.key});

  @override
  State<ReportScreen> createState() => _ReportScreenState();
}

class _ReportScreenState extends State<ReportScreen> {
  final _formKey = GlobalKey<FormState>();
  final _descriptionController = TextEditingController();
  final _phoneController = TextEditingController();
  
  String? _selectedNeighborhoodId;
  String _selectedProblemType = 'no-water';
  bool _isSubmitting = false;

  final List<Map<String, String>> _problemTypes = [
    {'value': 'no-water', 'label': 'Sem água'},
    {'value': 'low-pressure', 'label': 'Pressão baixa'},
    {'value': 'dirty-water', 'label': 'Água suja'},
    {'value': 'other', 'label': 'Outro'},
  ];

  @override
  void dispose() {
    _descriptionController.dispose();
    _phoneController.dispose();
    super.dispose();
  }

  Future<void> _submitReport() async {
    if (!_formKey.currentState!.validate()) {
      return;
    }

    if (_selectedNeighborhoodId == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Selecione um bairro'),
          backgroundColor: Colors.red,
        ),
      );
      return;
    }

    setState(() {
      _isSubmitting = true;
    });

    try {
      final report = Report(
        id: '', // Will be set by the server
        neighborhoodId: _selectedNeighborhoodId!,
        problemType: _selectedProblemType,
        description: _descriptionController.text.trim(),
        contactPhone: _phoneController.text.trim().isNotEmpty 
            ? _phoneController.text.trim() 
            : null,
        createdAt: DateTime.now(), // Will be set by the server
      );

      await context.read<DataProvider>().submitReport(report);

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Denúncia enviada com sucesso!'),
            backgroundColor: Colors.green,
          ),
        );

        // Clear form
        _selectedNeighborhoodId = null;
        _selectedProblemType = 'no-water';
        _descriptionController.clear();
        _phoneController.clear();
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Erro ao enviar denúncia: $e'),
            backgroundColor: Colors.red,
          ),
        );
      }
    } finally {
      if (mounted) {
        setState(() {
          _isSubmitting = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<DataProvider>(
      builder: (context, provider, child) {
        return Scaffold(
          appBar: AppBar(
            title: const Text('Denunciar problema'),
            backgroundColor: Colors.red,
            foregroundColor: Colors.white,
          ),
          body: Form(
            key: _formKey,
            child: ListView(
              padding: const EdgeInsets.all(16),
              children: [
                // Info card
                Card(
                  color: Colors.blue.shade50,
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Icon(Icons.info_outline, color: Colors.blue.shade700),
                            const SizedBox(width: 8),
                            Text(
                              'Informações importantes',
                              style: TextStyle(
                                fontWeight: FontWeight.bold,
                                color: Colors.blue.shade700,
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 8),
                        Text(
                          '• Sua denúncia será analisada em até 24 horas\n'
                          '• Casos urgentes: ligue para 0800-123-4567\n'
                          '• Mantenha-se informado pelos nossos canais oficiais',
                          style: TextStyle(
                            color: Colors.blue.shade700,
                            fontSize: 13,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),

                const SizedBox(height: 20),

                // Neighborhood selection
                Text(
                  'Selecione o bairro *',
                  style: Theme.of(context).textTheme.titleMedium,
                ),
                const SizedBox(height: 8),
                DropdownButtonFormField<String>(
                  value: _selectedNeighborhoodId,
                  decoration: const InputDecoration(
                    border: OutlineInputBorder(),
                    hintText: 'Escolha seu bairro',
                  ),
                  items: provider.neighborhoods.map((neighborhood) {
                    return DropdownMenuItem(
                      value: neighborhood.id,
                      child: Text(neighborhood.name),
                    );
                  }).toList(),
                  onChanged: (value) {
                    setState(() {
                      _selectedNeighborhoodId = value;
                    });
                  },
                  validator: (value) {
                    if (value == null) {
                      return 'Selecione um bairro';
                    }
                    return null;
                  },
                ),

                const SizedBox(height: 20),

                // Problem type
                Text(
                  'Tipo do problema *',
                  style: Theme.of(context).textTheme.titleMedium,
                ),
                const SizedBox(height: 8),
                ..._problemTypes.map((type) => RadioListTile<String>(
                      title: Text(type['label']!),
                      value: type['value']!,
                      groupValue: _selectedProblemType,
                      onChanged: (value) {
                        setState(() {
                          _selectedProblemType = value!;
                        });
                      },
                      contentPadding: EdgeInsets.zero,
                    )),

                const SizedBox(height: 20),

                // Description
                Text(
                  'Descrição do problema',
                  style: Theme.of(context).textTheme.titleMedium,
                ),
                const SizedBox(height: 8),
                TextFormField(
                  controller: _descriptionController,
                  maxLines: 4,
                  decoration: const InputDecoration(
                    border: OutlineInputBorder(),
                    hintText: 'Descreva o problema em detalhes '
                        '(ex: há quantos dias, horários afetados, etc.)',
                  ),
                  validator: (value) {
                    if (value == null || value.trim().isEmpty) {
                      return 'Descreva o problema';
                    }
                    return null;
                  },
                ),

                const SizedBox(height: 20),

                // Contact phone
                Text(
                  'Contato (opcional)',
                  style: Theme.of(context).textTheme.titleMedium,
                ),
                const SizedBox(height: 8),
                TextFormField(
                  controller: _phoneController,
                  keyboardType: TextInputType.phone,
                  decoration: const InputDecoration(
                    border: OutlineInputBorder(),
                    hintText: '(84) 99999-9999',
                  ),
                ),

                const SizedBox(height: 30),

                // Submit button
                SizedBox(
                  height: 50,
                  child: ElevatedButton(
                    onPressed: _isSubmitting ? null : _submitReport,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.red,
                      foregroundColor: Colors.white,
                    ),
                    child: _isSubmitting
                        ? const Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              SizedBox(
                                width: 20,
                                height: 20,
                                child: CircularProgressIndicator(
                                  strokeWidth: 2,
                                  color: Colors.white,
                                ),
                              ),
                              SizedBox(width: 12),
                              Text('Enviando...'),
                            ],
                          )
                        : const Text(
                            'Enviar denúncia',
                            style: TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                  ),
                ),

                const SizedBox(height: 20),
              ],
            ),
          ),
        );
      },
    );
  }
}