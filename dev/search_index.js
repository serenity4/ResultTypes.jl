var documenterSearchIndex = {"docs":
[{"location":"pages/api/#ResultTypes-API-1","page":"API","title":"ResultTypes API","text":"","category":"section"},{"location":"pages/api/#Constructors-1","page":"API","title":"Constructors","text":"","category":"section"},{"location":"pages/api/#","page":"API","title":"API","text":"Result\nErrorResult","category":"page"},{"location":"pages/api/#ResultTypes.Result","page":"API","title":"ResultTypes.Result","text":"Result(val::T, exception_type::Type{E}=Exception) -> Result{T, E}\n\nCreate a Result that could hold a value of type T or an exception of type E, and store val in it. If the exception type is not provided, the supertype Exception is used as E.\n\n\n\n\n\n","category":"type"},{"location":"pages/api/#ResultTypes.ErrorResult","page":"API","title":"ResultTypes.ErrorResult","text":"ErrorResult(::Type{T}, exception::E) -> Result{T, E}\nErrorResult(::Type{T}, exception::AbstractString=\"\") -> Result{T, ErrorException}\n\nCreate a Result that could hold a value of type T or an exception of type E, and store exception in it. If the exception is provided as text, it is wrapped in the generic ErrorException. If no exception is provided, an ErrorException with an empty string is used. If the type argument is not provided, Any is used.\n\nErrorResult is a convenience function for creating a Result and is not its own type.\n\n\n\n\n\n","category":"function"},{"location":"pages/api/#Functions-1","page":"API","title":"Functions","text":"","category":"section"},{"location":"pages/api/#","page":"API","title":"API","text":"unwrap\nunwrap_error\nResultTypes.iserror","category":"page"},{"location":"pages/api/#ResultTypes.unwrap","page":"API","title":"ResultTypes.unwrap","text":"unwrap(result::Result{T, E}) -> T\nunwrap(val::T) -> T\nunwrap(::Type{T}, result_or_val) -> T\n\nAssumes result holds a value of type T and returns it. If result holds an exception instead, that exception is thrown.\n\nIf unwrap's argument is not a Result, it is returned.\n\nThe two-argument form of unwrap calls unwrap on its second argument, then converts it to type T.\n\n\n\n\n\n","category":"function"},{"location":"pages/api/#ResultTypes.unwrap_error","page":"API","title":"ResultTypes.unwrap_error","text":"unwrap_error(result::Result{T, E}) -> E\nunwrap_error(exception::E) -> E\n\nAssumes result holds an exception of type E and returns it. If result holds a value instead, throw an exception.\n\nIf unwrap_error's argument is an Exception, that exception is returned.\n\n\n\n\n\n","category":"function"},{"location":"pages/api/#ResultTypes.iserror","page":"API","title":"ResultTypes.iserror","text":"ResultTypes.iserror(x) -> Bool\n\nIf x is an Exception, return true. If x is an ErrorResult (a Result containing an Exception), return true. Return false in all other cases.\n\n\n\n\n\n","category":"function"},{"location":"pages/api/#Macros-1","page":"API","title":"Macros","text":"","category":"section"},{"location":"pages/api/#","page":"API","title":"API","text":"@try","category":"page"},{"location":"pages/api/#ResultTypes.@try","page":"API","title":"ResultTypes.@try","text":"@try x\n@try(x)\n\nif x is an error (i.e., iserror(x) == true), unwrap the error and return from the current function.  Otherwise, unwrap x.\n\nIf the unwrapped exception is of the wrong type, there must be a Base.convert method which will convert it to the correct type.  (See the example in the extended help below.)\n\nThis macro is meant to reduce boilerplate when calling functions returning Results.\n\nExtended help\n\nA typical set of functions using ResultTypes might look something like this:\n\nBase.convert(::Type{FooError}, err::BarError) = FooError(\"Got a BarError: $(err.msg)\")\n\nfunction isbar(y)::Result{Bool, BarError}\n    bad_value(y) && return BarError(\"Bad value: $y\")\n    return y == \"bar\"\nend\n\nfunction foo(x)::Result{Int, FooError}\n    result = isbar(x)\n    ResultTypes.iserror(result) && return unwrap_error(result)\n    is_b = unwrap(result)\n\n    return is_b ? 42 : 13\nend\n\nWith the @try macro, foo gets shortened to\n\nfunction foo(x)::Result{Int, FooError}\n    is_b = @try(isbar(x))\n    return is_b ? 42 : 13\nend\n\n\n\n\n\n@try x err\n@try(x, err)\n\nif x is an error, return a new exception err.  Otherwise, unwrap x.\n\nThis version of @try does not require any exceptions to be converted.\n\nExtended help\n\nExample:\n\nfunction isbar(y)::Result{Bool, BarError}\n    bad_value(y) && return BarError(\"Bad value: $y\")\n    return y == \"bar\"\nend\n\nfunction foo(x)::Result{Int, FooError}\n    is_b = @try(isbar(x), FooError())\n    return is_b ? 42 : 13\nend\n\n\n\n\n\n","category":"macro"},{"location":"#ResultTypes-1","page":"Home","title":"ResultTypes","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"(Image: Build Status) (Image: codecov)","category":"page"},{"location":"#","page":"Home","title":"Home","text":"ResultTypes provides a Result type which can hold either a value or an error. This allows us to return a value or an error in a type-stable manner without throwing an exception.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"DocTestSetup = quote\n    using ResultTypes\nend","category":"page"},{"location":"#Usage-1","page":"Home","title":"Usage","text":"","category":"section"},{"location":"#Basic-1","page":"Home","title":"Basic","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"We can construct a Result that holds a value:","category":"page"},{"location":"#","page":"Home","title":"Home","text":"julia> x = Result(2); typeof(x)\nResultTypes.Result{Int64,Exception}","category":"page"},{"location":"#","page":"Home","title":"Home","text":"or a Result that holds an error:","category":"page"},{"location":"#","page":"Home","title":"Home","text":"julia> x = ErrorResult(Int, \"Oh noes!\"); typeof(x)\nResultTypes.Result{Int64,ErrorException}","category":"page"},{"location":"#","page":"Home","title":"Home","text":"or either with a different error type:","category":"page"},{"location":"#","page":"Home","title":"Home","text":"julia> x = Result(2, DivideError); typeof(x)\nResultTypes.Result{Int64,DivideError}\n\njulia> x = ErrorResult(Int, DivideError()); typeof(x)\nResultTypes.Result{Int64,DivideError}","category":"page"},{"location":"#Exploiting-Function-Return-Types-1","page":"Home","title":"Exploiting Function Return Types","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"We can take advantage of automatic conversions in function returns (a Julia 0.5 feature):","category":"page"},{"location":"#","page":"Home","title":"Home","text":"julia> function integer_division(x::Int, y::Int)::Result{Int, DivideError}\n           if y == 0\n               return DivideError()\n           else\n               return div(x, y)\n           end\n       end\ninteger_division (generic function with 1 method)","category":"page"},{"location":"#","page":"Home","title":"Home","text":"This allows us to write code in the body of the function that returns either a value or an error without manually constructing Result types.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"julia> integer_division(3, 4)\nResult(0)\n\njulia> integer_division(3, 0)\nErrorResult(Int64, DivideError())","category":"page"}]
}