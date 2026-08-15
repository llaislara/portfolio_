'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/shared/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';

import { useSelectRole } from '../api/mutations';
import { useAuthStore } from '../store/auth-store';
import { useSonner } from '@/shared/hooks/use-sonner';

// Schema de validação
const selectRoleSchema = z.object({
  module_id: z.string().min(1, { message: 'Selecione um módulo' }),
  role_id: z.string().min(1, { message: 'Selecione um perfil' }),
});

type SelectRoleFormValues = z.infer<typeof selectRoleSchema>;

interface SelectRoleFormProps {
  onSuccess?: () => void;
}

export function SelectRoleForm({ onSuccess }: SelectRoleFormProps) {
  const { user } = useAuthStore();
  const selectRole = useSelectRole();
  const { toast } = useSonner();
  const [availableRoles, setAvailableRoles] = useState<Array<{ id: number; name: string }>>([]);

  const form = useForm<SelectRoleFormValues>({
    resolver: zodResolver(selectRoleSchema),
    defaultValues: {
      module_id: '',
      role_id: '',
    },
  });

  // Atualizar as opções de perfis quando um módulo for selecionado
  const onModuleChange = (module_id: string) => {
    form.setValue('role_id', '');

    if (!user?.available_modules || !module_id) {
      setAvailableRoles([]);
      return;
    }

    const selectedModule = user.available_modules.find(
      (module) => module.id.toString() === module_id
    );

    setAvailableRoles(selectedModule?.roles || []);
  };

  // Tratador de submissão do formulário
  async function onSubmit(values: SelectRoleFormValues) {
    try {
      await selectRole.mutateAsync({
        module_id: parseInt(values.module_id),
        role_id: parseInt(values.role_id),
      });

      toast({
        title: 'Módulo e perfil selecionados com sucesso',
      });

      onSuccess?.();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao selecionar módulo e perfil',
        description: 'Por favor, tente novamente.',
      });
      console.error('Select role error:', error);
    }
  }

  if (!user?.available_modules) {
    return <div>Carregando dados do usuário...</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="module_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Módulo</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  onModuleChange(value);
                }}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um módulo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {user.available_modules.map((module) => (
                    <SelectItem key={module.id} value={module.id.toString()}>
                      {module.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Perfil</FormLabel>
              <Select onValueChange={field.onChange} disabled={availableRoles.length === 0}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um perfil" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {availableRoles.map((role) => (
                    <SelectItem key={role.id} value={role.id.toString()}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={selectRole.isPending}>
          {selectRole.isPending ? 'Selecionando...' : 'Continuar'}
        </Button>
      </form>
    </Form>
  );
}
