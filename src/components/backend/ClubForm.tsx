
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Club } from '@/types/backend';

interface ClubFormProps {
  onSubmit: (data: Omit<Club, 'id' | 'created_at'>) => Promise<void>;
  initialData?: Club | null;
  onCancel: () => void;
  isSubmitting: boolean;
}

const ClubForm = ({ onSubmit, initialData, onCancel, isSubmitting }: ClubFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    abbreviation: '',
    city: '',
    island: '',
    founded_year: new Date().getFullYear(),
    logo_url: '',
    status: 'active' as 'active' | 'inactive'
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        abbreviation: initialData.abbreviation || '',
        city: initialData.city || '',
        island: initialData.island || '',
        founded_year: initialData.founded_year || new Date().getFullYear(),
        logo_url: initialData.logo_url || '',
        status: initialData.status || 'active'
      });
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const islands = [
    'Santiago', 'São Vicente', 'Santo Antão', 'Fogo', 
    'Maio', 'Sal', 'Boa Vista', 'Brava', 'São Nicolau'
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome do Clube *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            placeholder="Ex: Clube Desportivo Travadores"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="abbreviation">Abreviação</Label>
          <Input
            id="abbreviation"
            value={formData.abbreviation}
            onChange={(e) => setFormData({ ...formData, abbreviation: e.target.value })}
            placeholder="Ex: TRA"
            maxLength={5}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">Cidade</Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            placeholder="Ex: Praia"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="island">Ilha</Label>
          <select
            id="island"
            value={formData.island}
            onChange={(e) => setFormData({ ...formData, island: e.target.value })}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Selecionar ilha...</option>
            {islands.map((island) => (
              <option key={island} value={island}>{island}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="founded_year">Ano de Fundação</Label>
          <Input
            id="founded_year"
            type="number"
            min="1900"
            max={new Date().getFullYear()}
            value={formData.founded_year}
            onChange={(e) => setFormData({ ...formData, founded_year: parseInt(e.target.value) || new Date().getFullYear() })}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as 'ativo' | 'inativo' })}
            className="w-full p-2 border rounded-md"
          >
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="logo_url">URL do Logo</Label>
        <Input
          id="logo_url"
          type="url"
          value={formData.logo_url}
          onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
          placeholder="https://exemplo.com/logo.png"
        />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting} className="bg-cv-blue hover:bg-cv-blue/90">
          {isSubmitting ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              A guardar...
            </div>
          ) : (
            initialData ? 'Atualizar Clube' : 'Criar Clube'
          )}
        </Button>
      </div>
    </form>
  );
};

export default ClubForm;
