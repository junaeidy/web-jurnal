<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class JournalController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Journals/index');
    }

}
