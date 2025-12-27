{/* Redirecionamento de Funil (Somente se for Lead Page) */}
{isCapturePage && (
  <div className="space-y-4 bg-primary/5 p-4 rounded-lg border border-primary/10">
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-bold flex items-center gap-2">
        <Repeat className="w-4 h-4 text-primary" /> Funil Conectado
      </h3>
      <Switch 
        checked={templateData.redirectAfterCapture?.enabled} 
        onCheckedChange={(checked) => updateRedirect({ enabled: checked })}
      />
    </div>
    
    <p className="text-[11px] text-muted-foreground">
      Redirecione o lead para sua página de vendas imediatamente após a captura.
    </p>

    {templateData.redirectAfterCapture?.enabled && (
      <div className="space-y-3 pt-2">
        <div className="space-y-1">
          <Label className="text-[10px]">Página de Vendas (Destino)</Label>
          <Select 
            value={templateData.redirectAfterCapture?.targetPageId} 
            onValueChange={(v) => updateRedirect({ targetPageId: v })}
          >
            <SelectTrigger className="h-8 text-xs">
              <SelectValue placeholder="Selecione a página" />
            </SelectTrigger>
            <SelectContent>
              {salesPages.map(page => (
                <SelectItem key={page.id} value={page.id}>{page.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label className="text-[10px]">Aguardar (segundos)</Label>
          <Input 
            type="number" 
            className="h-8 text-xs" 
            value={templateData.redirectAfterCapture?.delay || 3} 
            onChange={(e) => updateRedirect({ delay: parseInt(e.target.value) })}
          />
        </div>
      </div>
    )}
  </div>
)}