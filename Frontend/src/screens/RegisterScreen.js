const handleSubmit = async () => {
    if (!form.firstname || !form.lastname || !form.email || !form.password) {
        Alert.alert("Error", "Completa todos los campos.");
        return;
    }

    setLoading(true);
    try {
        const data = await registerUser(form);
        await login(data.email, form.password); // solo una vez
        Alert.alert("Bienvenido", "Tu cuenta fue creada con éxito");
    } catch (err) {
        Alert.alert("Error", "No se pudo registrar");
    } finally {
        setLoading(false);
    }
};
