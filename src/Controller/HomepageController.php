<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class HomepageController extends AbstractController
{
    #[Route('/', name: 'app_homepage')]
    public function index(): Response
    {

        $testArray = [
            "a",
            "b",
            "c",
            "d",
            "e",
        ];

        return $this->render('homepage/index.html.twig', [
            'controller_name' => 'HomepageController',
            'test' => $testArray
        ]);
    }
}
