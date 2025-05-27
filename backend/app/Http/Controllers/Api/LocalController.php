<?php
// app/Http/Controllers/LocalController.php

namespace App\Http\Controllers;

use App\Models\Local;
use Illuminate\Http\Request;

class LocalController extends Controller
{
    public function index()
    {
        return Local::all();
    }

    public function show($id)
    {
        return Local::findOrFail($id);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'capacite' => 'required|integer|min:1',
            'prix_heure' => 'required|numeric|min:0',
            'localisation' => 'required|string|max:255',
            'actif' => 'boolean',
        ]);

        $local = Local::create($validated);
        return response()->json($local, 201);
    }

    public function update(Request $request, $id)
    {
        $local = Local::findOrFail($id);

        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'capacite' => 'required|integer|min:1',
            'prix_heure' => 'required|numeric|min:0',
            'localisation' => 'required|string|max:255',
            'actif' => 'boolean',
        ]);

        $local->update($validated);
        return response()->json($local);
    }

    public function destroy($id)
    {
        $local = Local::findOrFail($id);
        $local->delete();

        return response()->json(['message' => 'Local supprimé']);
    }
}
