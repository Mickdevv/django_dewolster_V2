from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from base.models import Product, User, Review
# from base.products import products
from base.serializers import ProductSerializer, UserSerializer, UserSerializerWithToken

from rest_framework import status

@api_view(['GET'])
def getProducts(request):
    # Get query parameter from request
    query = request.query_params.get('keyword')
    # Don't search for an empty string
    if query == None:
        query = ''
        
    # TO DO : Also search within the description, maybe add keywords too ? 
    products = Product.objects.filter(name__icontains=query)
    
    page = request.query_params.get('page')

    Num_products_per_page = 2000
    paginator = Paginator(products, Num_products_per_page)
    
    try:
        products = paginator.page(page)
    except PageNotAnInteger :
        products = paginator.page(1)
    except EmptyPage :
        products = paginator.page(paginator.num_pages)
        
    if page == None:
        page = 1
        
    serializer = ProductSerializer(products, many=True)
    return Response({'products': serializer.data, 'page': page, 'pages': paginator.num_pages})

@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data
    product = Product.objects.get(_id=pk)
    
    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.category = data['category']
    product.image = data['image']
    product.description = data['description']
    product.countInStock = data['countInStock']
    
    product.save()
    
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user
    product = Product.objects.create(
        user=user,
        name='Sample name',
        brand='Sample brand',
        price=99.99,
        countInStock=0,
        category='Sample category',
        description='Sample description',
        image='',
        rating=4,
    )
    
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('Product with ID ' + pk + ' deleted')


@api_view(['POST'])
def uploadImage(request):
    data = request.data
    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)

    product.image = request.FILES.get('image')
    product.save()
    # product.image.url = ('/images' + product.image.url.split('/images')[-1])

    print("Image URL : " + product.image.url)
    return Response(product.image.url)
    # return Response('/images' + product.image.url.split('/images')[-1])
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def CreateProductReview(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data
    
    alreadyExists = product.review_set.filter(user=user).exists()
    
    if alreadyExists:
        content = {'detail':'Product already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    
    elif data['rating'] == 0:
        content = {'detail':'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    
    else: 
        review = Review.objects.create(
            user = user,
            product = product,
            name = user.first_name,
            rating = data['rating'],
            comment = data['comment']
        )
        
        reviews = product.review_set.all()
        product.numReviews = len(reviews)
        
        total = 0
        for i in reviews:
            total += i.rating
            
        product.rating = total/len(reviews)
            
        product.save()
        
        return Response('Review added')