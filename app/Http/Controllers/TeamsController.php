<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class TeamsController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Teams/Index');
    }
}
