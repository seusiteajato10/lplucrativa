export default function ProductTemplateVSL({ data, projectName }: any) {
  return (
    <div className="min-h-screen bg-purple-900 text-white p-8">
      <h1 className="text-6xl font-bold mb-4">
        TESTE VSL FUNCIONANDO! 🎉
      </h1>
      <p className="text-2xl">
        Projeto: {projectName || "Sem nome"}
      </p>
      <p className="text-xl mt-4">
        Se você está vendo isso, o template VSL está carregando!
      </p>
    </div>
  );
}
